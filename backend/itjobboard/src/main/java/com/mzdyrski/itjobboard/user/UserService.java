package com.mzdyrski.itjobboard.user;

import com.mzdyrski.itjobboard.email.EmailService;
import com.mzdyrski.itjobboard.exception.BadRequestDataException;
import com.mzdyrski.itjobboard.exception.InvalidEmailException;
import com.mzdyrski.itjobboard.exception.UserExistsException;
import com.mzdyrski.itjobboard.security.JWTTokenProvider;
import com.mzdyrski.itjobboard.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.mzdyrski.itjobboard.email.EmailType.ACCOUNT_CREATED;
import static com.mzdyrski.itjobboard.security.SecurityConstants.TOKEN_HEADER;
import static com.mzdyrski.itjobboard.user.Role.ROLE_EMPLOYEE;
import static com.mzdyrski.itjobboard.user.Role.ROLE_EMPLOYER;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ConfirmationTokenRepository tokenRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final LoginAttemptService loginAttemptService;
    private final JWTTokenProvider jwtTokenProvider;
    private final MongoTemplate mongoTemplate;
    private final EmailService emailService;

    @Override
    public UserSecurity loadUserByUsername(String email) {
        var user = findUserByEmail(email);
        validateLoginAttempt(user);
        return new UserSecurity(user);
    }

    public void register(RegisterData data) throws UserExistsException, InvalidEmailException, BadRequestDataException, MessagingException {
        validateNewEmail(data.email());
        var user = getUserClass(data);
        user.setEmail(data.email());
        user.setPassword(encodedPassword(data.password()));
        user.setRole(Role.valueOf(data.role()).name());
        user.setAuthorities(Role.valueOf(data.role()).getAuthorities());
        user.setActive(false);
        user.setJoinDate(new Date());
        user.setLocked(false);
        userRepository.save(user);
        var confirmationToken = new ConfirmationToken(user.getId());
        tokenRepository.save(confirmationToken);
        emailService.sendEmail(data.email(), ACCOUNT_CREATED, confirmationToken.getToken());
    }

    public void activateUser(String token) {
        var confirmationToken = tokenRepository.findConfirmationTokenByToken(token).orElseThrow();
        var user = userRepository.findById(confirmationToken.getUserId()).orElseThrow();
        user.setActive(true);
        userRepository.save(user);
        tokenRepository.delete(confirmationToken);
    }

    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public void changePassword(String authorizationHeader, ChangePasswordData data) throws BadRequestDataException {
        var user = getUserFromTokenHeader(authorizationHeader);
        if (user != null) {
            if (passwordEncoder.matches(data.oldPassword(), user.getPassword())) {
                var encodedNew = encodedPassword(data.newPassword());
                user.setPassword(encodedNew);
                userRepository.save(user);
            } else {
                throw new BadRequestDataException("Wrong password");
            }
        }
    }

    public String updateEmployeeCv(String authorizationHeader, MultipartFile file) throws IOException {
        var user = getUserFromTokenHeader(authorizationHeader);
        if (!Objects.equals(user.getRole(), ROLE_EMPLOYEE.name())) {
            return null;
        }
        var cv = new EmployeesCv();
        cv.setEmployeeId(user.getId());
        cv.setFileName(file.getOriginalFilename());
        cv.setFileType(file.getContentType());
        cv.setFileSize(file.getSize());
        cv.setFile(new Binary(file.getBytes()));
        var savedCV = mongoTemplate.save(cv, "employees_cvs");
        return savedCV.getFileName();
    }

    public List<User> getUsersByFilters(Aggregation aggregation) {
        return mongoTemplate.aggregate(aggregation, "users", User.class).getMappedResults();
    }

    public UserStatusUpdateData updateUserStatus(String userId, UserStatusData data) {
        var user = userRepository.findById(userId).orElseThrow();
        user.setLocked(data.locked());
        user.setActive(data.active());
        userRepository.save(user);
        return new UserStatusUpdateData(userId, user.isLocked(), user.isActive());
    }

    public User getUserFromTokenHeader(String authorizationHeader) {
        var token = StringUtils.remove(authorizationHeader, TOKEN_HEADER);
        var email = jwtTokenProvider.getSubject(token);
        return findUserByEmail(email);
    }

    public UserInfoData getUserData(String authorizationHeader) {
        var user = getUserFromTokenHeader(authorizationHeader);
        if (Objects.equals(user.getRole(), ROLE_EMPLOYER.name())) {
            var employer = Optional.ofNullable(mongoTemplate.findById(user.getId(), Employer.class, "users")).orElseThrow();
            return new UserInfoData(employer.getEmail(),
                    employer.getRole(),
                    employer.getJoinDate(),
                    null,
                    null,
                    null,
                    employer.getCompanyName(),
                    employer.getCompanyLogoUrl(),
                    employer.getCompanySiteUrl(),
                    employer.getCompanySize());
        } else if (Objects.equals(user.getRole(), ROLE_EMPLOYEE.name())) {
            var employee = Optional.ofNullable(mongoTemplate.findById(user.getId(), Employee.class, "users")).orElseThrow();
            var cv = Optional.ofNullable(
                    mongoTemplate.findOne(new Query(new Criteria("employeeId").is(user.getId())), EmployeesCv.class, "employees_cvs"));
            return new UserInfoData(employee.getEmail(),
                    employee.getRole(),
                    employee.getJoinDate(),
                    employee.getFirstName(),
                    employee.getLastName(),
                    cv.map(EmployeesCv::getFileName).orElse(null),
                    null,
                    null,
                    null,
                    null);
        }
        return new UserInfoData(user.getEmail(),
                user.getRole(),
                user.getJoinDate(),
                null,
                null,
                null,
                null,
                null,
                null,
                null);
    }

    private void validateLoginAttempt(User user) {
        if (!user.isLocked()) {
            user.setLocked(loginAttemptService.hasExceededMaxAttempts(user.getEmail()));
        } else {
            loginAttemptService.evictUserFromCache(user.getEmail());
        }
    }

    private User getUserClass(RegisterData data) throws BadRequestDataException {
        switch (data.role()) {
            case "ROLE_EMPLOYEE" -> {
                var employee = new Employee();
                employee.setFirstName(data.firstName());
                employee.setLastName(data.lastName());
                return employee;
            }
            case "ROLE_EMPLOYER" -> {
                var employer = new Employer();
                employer.setCompanyName(data.companyName());
                employer.setCompanySize(data.companySize());
                employer.setCompanySiteUrl(data.companySiteUrl());
                employer.setCompanyLogoUrl(data.companyLogoUrl());
                return employer;
            }
//          case "ROLE_ADMIN" -> new User();
            default -> throw new BadRequestDataException("Unsupported role");
        }
    }

    private String encodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    private void validateNewEmail(String email) throws UserExistsException, InvalidEmailException {
        if (StringUtils.isNotBlank(email)) {
            if (userRepository.findUserByEmail(email) != null) {
                throw new UserExistsException("User by given email exists");
            }
        } else {
            throw new InvalidEmailException("Invalid Email");
        }
    }

}

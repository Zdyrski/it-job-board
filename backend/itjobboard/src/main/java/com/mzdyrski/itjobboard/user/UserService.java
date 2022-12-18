package com.mzdyrski.itjobboard.user;

import com.mzdyrski.itjobboard.exception.BadRequestDataException;
import com.mzdyrski.itjobboard.exception.InvalidEmailException;
import com.mzdyrski.itjobboard.exception.UserExistsException;
import com.mzdyrski.itjobboard.security.JWTTokenProvider;
import com.mzdyrski.itjobboard.email.EmailService;
import com.mzdyrski.itjobboard.user.dto.ChangePasswordData;
import com.mzdyrski.itjobboard.user.dto.RegisterData;
import com.mzdyrski.itjobboard.user.dto.UserStatusData;
import com.mzdyrski.itjobboard.user.dto.UserUpdateData;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.mzdyrski.itjobboard.security.SecurityConstants.TOKEN_HEADER;
import static com.mzdyrski.itjobboard.email.EmailType.ACCOUNT_CREATED;
import static com.mzdyrski.itjobboard.user.Role.ROLE_EMPLOYEE;
import static com.mzdyrski.itjobboard.user.Role.ROLE_EMPLOYER;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ConfirmationTokenRepository tokenRepository;
    private final EmployeesCvRepository cvRepository;
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

    public void register(RegisterData data, String siteUrl) throws UserExistsException, InvalidEmailException, BadRequestDataException, MessagingException {
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
        emailService.sendEmail(data.email(), ACCOUNT_CREATED, siteUrl, confirmationToken.getToken());
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

    public void updateUserInfo(User user, UserUpdateData data) {
        if (Objects.equals(user.getRole(), ROLE_EMPLOYEE.name())) {
            var employee = (Employee) user;
            employee.setFirstName(data.firstName());
            employee.setLastName(data.lastName());
            userRepository.save(employee);
        } else if (Objects.equals(user.getRole(), ROLE_EMPLOYER.name())) {
            var employer = (Employer) user;
            employer.setCompanyName(data.companyName());
            employer.setCompanySize(data.companySize());
            employer.setCompanyLogoUrl(data.companyLogoUrl());
            employer.setCompanySiteUrl(data.companySiteUrl());
            userRepository.save(employer);
        }
    }

    public void changePassword(String authorizationHeader, ChangePasswordData data) throws BadRequestDataException {
        var user = getUserFromTokenHeader(authorizationHeader);
        if (user != null) {
            if (passwordEncoder.matches(data.oldPassword(), user.getPassword())) {
                var encodedNew = encodedPassword(data.newPassword());
                user.setPassword(encodedNew);
                userRepository.save(user);
            }else {
                throw new BadRequestDataException("Wrong password");
            }
        }
    }

    public void resetPassword(String email) {
        var user = findUserByEmail(email);
        var newPassword = RandomStringUtils.randomAlphanumeric(9);
        var encodedNewPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedNewPassword);
        // TODO send email
        userRepository.save(user);
    }

    public void updateEmployeeCv(Employee employee, MultipartFile file) throws IOException {
        if (!Objects.equals(employee.getRole(), ROLE_EMPLOYEE.name())) {
            return;
        }
        var cv = new EmployeesCv();
        cv.setEmployeeId(employee.getId());
        cv.setFileName(file.getOriginalFilename());
        cv.setFileType(file.getContentType());
        cv.setFileSize(file.getSize());
        cv.setFile(new Binary(file.getBytes()));
        cvRepository.save(cv);
    }

    public List<User> getUsersByFilters(Aggregation aggregation) {
        return mongoTemplate.aggregate(aggregation, "users", User.class).getMappedResults();
    }

    public void updateUserStatus(String userId, UserStatusData data) {
        var user = userRepository.findById(userId).orElseThrow();
        user.setLocked(data.locked());
        user.setActive(data.active());
        userRepository.save(user);
    }

    public User getUserFromTokenHeader(String authorizationHeader) {
        var token = StringUtils.remove(authorizationHeader, TOKEN_HEADER);
        var email = jwtTokenProvider.getSubject(token);
        return findUserByEmail(email);
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

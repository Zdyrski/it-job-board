package com.mzdyrski.itjobboard.services;

import com.mzdyrski.itjobboard.dataTemplates.ChangePasswordData;
import com.mzdyrski.itjobboard.dataTemplates.UserStatusData;
import com.mzdyrski.itjobboard.dataTemplates.UserUpdateData;
import com.mzdyrski.itjobboard.domain.*;
import com.mzdyrski.itjobboard.enums.Role;
import com.mzdyrski.itjobboard.exceptions.BadRequestDataException;
import com.mzdyrski.itjobboard.exceptions.InvalidEmailException;
import com.mzdyrski.itjobboard.exceptions.UserExistsException;
import com.mzdyrski.itjobboard.security.JWTTokenProvider;
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

import static com.mzdyrski.itjobboard.constants.SecurityConstants.TOKEN_HEADER;
import static com.mzdyrski.itjobboard.enums.EmailType.ACCOUNT_CREATED;
import static com.mzdyrski.itjobboard.enums.Role.ROLE_EMPLOYEE;
import static com.mzdyrski.itjobboard.enums.Role.ROLE_EMPLOYER;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService, UserDetailsService {

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

    @Override
    public void register(String email, String password, String role, String siteUrl) throws UserExistsException, InvalidEmailException, BadRequestDataException, MessagingException {
        validateNewEmail(email);
        var user = getUserClass(role);
        user.setEmail(email);
        user.setPassword(encodedPassword(password));
        user.setRole(Role.valueOf(role).name());
        user.setAuthorities(Role.valueOf(role).getAuthorities());
        user.setActive(false);
        user.setJoinDate(new Date());
        user.setLocked(false);
        userRepository.save(user);
        var confirmationToken = new ConfirmationToken(user.getId());
        tokenRepository.save(confirmationToken);
        emailService.sendEmail(email, ACCOUNT_CREATED, siteUrl, confirmationToken.getToken());
    }

    public void activateUser(String token) {
        var confirmationToken = tokenRepository.findConfirmationTokenByToken(token).orElseThrow();
        var user = userRepository.findById(confirmationToken.getUserId()).orElseThrow();
        user.setActive(true);
        userRepository.save(user);
        tokenRepository.delete(confirmationToken);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
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

    @Override
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

    @Override
    public void resetPassword(String email) {
        var user = findUserByEmail(email);
        var newPassword = RandomStringUtils.randomAlphanumeric(9);
        var encodedNewPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedNewPassword);
        // TODO send email
        userRepository.save(user);
    }

    @Override
    public void updateEmployeeCv(Employee employee, MultipartFile file) throws IOException {
        if (!Objects.equals(employee.getRole(), ROLE_EMPLOYEE.name())) {
            return;
        }
        var cv = new EmployeesCv();
        cv.setEmployeeId(employee.getId());
        cv.setFilename(file.getOriginalFilename());
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

    private User getUserClass(String role) throws BadRequestDataException {
        return switch (role) {
            case "ROLE_EMPLOYEE" -> new Employee();
            case "ROLE_EMPLOYER" -> new Employer();
            case "ROLE_ADMIN" -> new User();
            default -> throw new BadRequestDataException("Unsupported role");
        };
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

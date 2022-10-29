package com.mzdyrski.itjobboard.service;

import com.mzdyrski.itjobboard.domain.*;
import com.mzdyrski.itjobboard.enums.Role;
import com.mzdyrski.itjobboard.exceptions.BadRequestDataException;
import com.mzdyrski.itjobboard.exceptions.InvalidEmailException;
import com.mzdyrski.itjobboard.exceptions.UserExistsException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final LoginAttemptService loginAttemptService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var user = userRepository.findUserByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found for: " + email);
        } else {
            validateLoginAttempt(user);
            return new UserSecurity(user);
        }
    }

    private void validateLoginAttempt(User user) {
        if (user.isNotLocked()) {
            user.setNotLocked(!loginAttemptService.hasExceededMaxAttempts(user.getEmail()));
        } else {
            loginAttemptService.evictUserFromCache(user.getEmail());
        }
    }

    @Override
    public User register(String email, String password, String role) throws UserExistsException, InvalidEmailException, BadRequestDataException {
        validateNewEmail(email);
        var user = getUserClass(role);
        user.setEmail(email);
        user.setPassword(encodedPassword(password));
        user.setRole(Role.valueOf(role).name());
        user.setAuthorities(Role.valueOf(role).getAuthorities());
        user.setActive(true);
        user.setJoinedDate(new Date());
        user.setNotLocked(true);
        userRepository.save(user);
        return null;
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public void updateUserInfo(User user) {

    }

    @Override
    public void changePassword(User user, String oldPassword, String newPassword) {
        var encodedOld = passwordEncoder.encode(oldPassword);
        if (user != null) {
            if (StringUtils.equals(encodedOld, user.getPassword())) {
                var encodedNew = passwordEncoder.encode(newPassword);
                user.setPassword(encodedNew);
                userRepository.save(user);
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
        System.out.println(newPassword);
    }

    @Override
    public void updateCV(MultipartFile file) {

    }


    private User getUserClass(String role) throws BadRequestDataException {
        return switch (role) {
            case "ROLE_EMPLOYEE" -> new Employee();
            case "ROLE_EMPLOYER" -> new Employer();
            default -> throw new BadRequestDataException("Unsupported role");
        };
    }

    private String encodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    private void validateNewEmail(String email) throws UserExistsException, InvalidEmailException {
        if (StringUtils.isNotBlank(email)) {
            var user = findUserByEmail(email);
            if (user != null) {
                throw new UserExistsException("User by given email exists");
            }
        } else {
            throw new InvalidEmailException("Invalid Email");
        }
    }
}

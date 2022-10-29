package com.mzdyrski.itjobboard.service;

import com.mzdyrski.itjobboard.domain.User;
import com.mzdyrski.itjobboard.exceptions.BadRequestDataException;
import com.mzdyrski.itjobboard.exceptions.InvalidEmailException;
import com.mzdyrski.itjobboard.exceptions.UserExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    User register(String email, String password, String userType) throws UserExistsException, InvalidEmailException, BadRequestDataException;
    User findUserByEmail(String email);
    void updateUserInfo(User user);
    void changePassword(User user, String oldPassword, String newPassword);
    void resetPassword(String email);
    void updateCV(MultipartFile file);
}

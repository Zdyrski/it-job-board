package com.mzdyrski.itjobboard.controller;

import com.mzdyrski.itjobboard.dataTemplates.*;
import com.mzdyrski.itjobboard.domain.Employee;
import com.mzdyrski.itjobboard.domain.User;
import com.mzdyrski.itjobboard.domain.UserSecurity;
import com.mzdyrski.itjobboard.exceptions.BadRequestDataException;
import com.mzdyrski.itjobboard.exceptions.InvalidEmailException;
import com.mzdyrski.itjobboard.exceptions.UserExistsException;
import com.mzdyrski.itjobboard.security.JWTTokenProvider;
import com.mzdyrski.itjobboard.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.IOException;

import static com.mzdyrski.itjobboard.constants.SecurityConstants.JWT_TOKEN_HEADER;
import static com.mzdyrski.itjobboard.constants.SecurityConstants.TOKEN_HEADER;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS;
import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@Service
@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserServiceImpl userServiceImpl;
    private final JWTTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public Mono<ResponseEntity<User>> register(@RequestBody RegisterData data) throws UserExistsException, InvalidEmailException, BadRequestDataException {
        var newUser = userServiceImpl.register(data.email(), data.password(), data.role());
        return Mono.just(new ResponseEntity<>(newUser, OK));
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<User>> login(@RequestBody LoginData loginData) {
        authenticate(loginData.email(), loginData.password());  // TODO
        var user = userServiceImpl.findUserByEmail(loginData.email());
        var jwtHeader = getJwtHeader(new UserSecurity(user));
        return Mono.just(new ResponseEntity<>(null, jwtHeader, OK));
    }

    @GetMapping("/account")
    public Mono<ResponseEntity<User>> account(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        var user = userServiceImpl.getUserFromTokenHeader(authorizationHeader);

        user.setPassword("XD");
        return Mono.just(new ResponseEntity<>(user, OK));
    }

    @PostMapping("/account")
    public Mono<ResponseEntity<User>> accountInfoUpdate(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody UserUpdateData data) {
        var user = userServiceImpl.getUserFromTokenHeader(authorizationHeader);
        // TODO aktualizacja konta(mapowanie body na usera)
        userServiceImpl.updateUserInfo(user, data);
        return Mono.just(new ResponseEntity<>(user, OK));
    }

    @PostMapping(value = "/account/cv", consumes = { "multipart/mixed", "multipart/form-data" })
    public Mono<ResponseEntity<User>> employeeCvUpdate(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestPart(name = "file") MultipartFile multipartFile) throws IOException {
        var user = userServiceImpl.getUserFromTokenHeader(authorizationHeader);
        // TODO validacja pliku
        System.out.println("1 " + multipartFile.getOriginalFilename());
        userServiceImpl.updateEmployeeCv((Employee) user, multipartFile);
        return Mono.just(new ResponseEntity<>(user, OK));
    }

    @PostMapping("/password")
    public Mono<ResponseEntity<String>> passwordUpdate(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody ChangePasswordData data) {
        var user = userServiceImpl.getUserFromTokenHeader(authorizationHeader);
        userServiceImpl.changePassword(user, data.oldPassword(), data.newPassword());
        return Mono.just(new ResponseEntity<>("PASSWORD CHANGED", OK));
    }

    @PostMapping("/resetpassword")
    public Mono<ResponseEntity<String>> passwordUpdate(@RequestBody ResetPasswordData data) {
        userServiceImpl.resetPassword(data.email());
        return Mono.just(new ResponseEntity<>("PASSWORD RESETED", OK));
    }

    private HttpHeaders getJwtHeader(UserSecurity userSecurity) {
        var headers = new HttpHeaders();
        headers.add(ACCESS_CONTROL_EXPOSE_HEADERS, JWT_TOKEN_HEADER);
        headers.add(JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(userSecurity));
        return headers;
    }

    private void authenticate(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    }
}

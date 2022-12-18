package com.mzdyrski.itjobboard.controllers;

import com.mzdyrski.itjobboard.dataTemplates.*;
import com.mzdyrski.itjobboard.domain.Employee;
import com.mzdyrski.itjobboard.domain.User;
import com.mzdyrski.itjobboard.domain.UserSecurity;
import com.mzdyrski.itjobboard.exceptions.BadRequestDataException;
import com.mzdyrski.itjobboard.exceptions.InvalidEmailException;
import com.mzdyrski.itjobboard.exceptions.UserExistsException;
import com.mzdyrski.itjobboard.security.JWTTokenProvider;
import com.mzdyrski.itjobboard.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.mzdyrski.itjobboard.constants.SecurityConstants.JWT_TOKEN_HEADER;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS;
import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@Service
@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final JWTTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public Mono<ResponseEntity<User>> register(@RequestBody RegisterData data) throws UserExistsException, InvalidEmailException, BadRequestDataException, MessagingException {
        userService.register(data, "http://localhost:3000");
        return Mono.just(new ResponseEntity<>(CREATED));
    }

    @GetMapping("/register/confirm")
    public Mono<ResponseEntity<User>> confirm(@RequestParam String token) {
        if (token != null) {
            userService.activateUser(token);
            return Mono.just(new ResponseEntity<>(OK));
        } else {
            return Mono.just(new ResponseEntity<>(BAD_REQUEST));
        }
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<User>> login(@RequestBody LoginData loginData) {
        authenticate(loginData.email(), loginData.password());
        var user = userService.loadUserByUsername(loginData.email());
        var jwtHeader = getJwtHeader(user);
        return Mono.just(new ResponseEntity<>(null, jwtHeader, OK));
    }

    @GetMapping("/account")
    public Mono<ResponseEntity<User>> account(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        var user = userService.getUserFromTokenHeader(authorizationHeader);
        // TODO
        user.setPassword("XD");
        return Mono.just(new ResponseEntity<>(user, OK));
    }

    @PostMapping("/account")
    public Mono<ResponseEntity<User>> accountInfoUpdate(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody UserUpdateData data) {
        var user = userService.getUserFromTokenHeader(authorizationHeader);
        // TODO aktualizacja konta(mapowanie body na usera)
        userService.updateUserInfo(user, data);
        return Mono.just(new ResponseEntity<>(user, OK));
    }

    @PostMapping(value = "/account/cv", consumes = {"multipart/mixed", "multipart/form-data"})
    public Mono<ResponseEntity<User>> employeeCvUpdate(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestPart(name = "file") MultipartFile multipartFile) throws IOException {
        var user = userService.getUserFromTokenHeader(authorizationHeader);
        // TODO validacja pliku
        userService.updateEmployeeCv((Employee) user, multipartFile);
        return Mono.just(new ResponseEntity<>(OK));
    }

    @PostMapping("/account/password")
    public Mono<ResponseEntity<String>> passwordUpdate(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody ChangePasswordData data) throws BadRequestDataException {
        userService.changePassword(authorizationHeader, data);
        return Mono.just(new ResponseEntity<>(OK));
    }

    @PostMapping("/resetpassword")
    public Mono<ResponseEntity<String>> passwordUpdate(@RequestBody ResetPasswordData data) {
        userService.resetPassword(data.email());
        return Mono.just(new ResponseEntity<>("PASSWORD RESETED", OK));
    }

    @GetMapping("/admin")
    public Mono<ResponseEntity<List<User>>> getUsers(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
                                                     @RequestParam Optional<String> userId,
                                                     @RequestParam Optional<String> email,
                                                     @RequestParam Optional<String> role,
                                                     @RequestParam Optional<Boolean> active,
                                                     @RequestParam Optional<Boolean> locked,
                                                     @RequestParam Optional<Long> page,
                                                     @RequestParam Optional<Long> limit) {
        var skip0 = skip(0L);
        var userIdAgg = userId.isPresent() ? match(new Criteria("id").regex(userId.orElse(""))) : skip0;
        var emailAgg = email.isPresent() ? match(new Criteria("email").regex(email.orElse(""))) : skip0;
        var roleAgg = role.isPresent() ? match(new Criteria("role").is(role.get())) : skip0;
        var activeAgg = active.isPresent() ? match(new Criteria("active").is(active.get())) : skip0;
        var lockedAgg = locked.isPresent() ? match(new Criteria("locked").is(locked.get())) : skip0;
        var skipAgg = (page.isPresent() && limit.isPresent()) ? skip(page.get() * limit.get()) : skip0;
        var limitAgg = limit.isPresent() ? limit(limit.get()) : skip0;

        var sortCriteria = sort(Sort.Direction.DESC, "joinDate");
        var projectionOperation = project().andInclude("id", "email", "role", "joinDate", "active", "locked");

        var aggregation = newAggregation(
                userIdAgg,
                emailAgg,
                roleAgg,
                activeAgg,
                lockedAgg,
                sortCriteria,
                skipAgg,
                limitAgg,
                projectionOperation
        );
        var users = userService.getUsersByFilters(aggregation);
        return Mono.just(new ResponseEntity<>(users, OK));
    }

    @PostMapping("/admin/{userId}")
    public Mono<ResponseEntity<List<User>>> updateUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable String userId, @RequestBody UserStatusData data) {
        var admin = userService.getUserFromTokenHeader(authorizationHeader);
        // TODO
        userService.updateUserStatus(userId, data);
        return Mono.just(new ResponseEntity<>(OK));
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

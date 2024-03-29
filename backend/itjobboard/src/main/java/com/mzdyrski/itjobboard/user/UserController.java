package com.mzdyrski.itjobboard.user;

import com.mzdyrski.itjobboard.exception.BadRequestDataException;
import com.mzdyrski.itjobboard.exception.InvalidEmailException;
import com.mzdyrski.itjobboard.exception.UserExistsException;
import com.mzdyrski.itjobboard.security.JWTTokenProvider;
import com.mzdyrski.itjobboard.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
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
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.mzdyrski.itjobboard.security.SecurityConstants.JWT_TOKEN_HEADER;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS;
import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@Service
@RestController
@RequestMapping(value = "/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final JWTTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public Mono<ResponseEntity<User>> register(@Valid @RequestBody RegisterData data) throws UserExistsException, InvalidEmailException, BadRequestDataException, MessagingException {
        userService.register(data);
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
    public Mono<ResponseEntity<User>> login(@Valid @RequestBody LoginData loginData) {
        authenticate(loginData.email(), loginData.password());
        var user = userService.loadUserByUsername(loginData.email());
        var jwtHeader = getJwtHeader(user);
        return Mono.just(new ResponseEntity<>(null, jwtHeader, OK));
    }

    @GetMapping("/account")
    public Mono<ResponseEntity<UserInfoData>> account(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        var userData = userService.getUserData(authorizationHeader);
        return Mono.just(new ResponseEntity<>(userData, OK));
    }

    @PostMapping(value = "/account/cv", consumes = {"multipart/mixed", "multipart/form-data"})
    public Mono<ResponseEntity<String>> employeeCvUpdate(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestPart(name = "file") MultipartFile multipartFile) throws IOException {
        var fileName = userService.updateEmployeeCv(authorizationHeader, multipartFile);
        return Mono.just(new ResponseEntity<>(fileName, OK));
    }

    @PostMapping("/account/password")
    public Mono<ResponseEntity<String>> passwordUpdate(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,@Valid @RequestBody ChangePasswordData data) throws BadRequestDataException {
        userService.changePassword(authorizationHeader, data);
        return Mono.just(new ResponseEntity<>(OK));
    }

    @GetMapping("/admin")
    public Mono<ResponseEntity<List<User>>> getUsers(@RequestParam Optional<String> userId,
                                                     @RequestParam Optional<String> email,
                                                     @RequestParam Optional<String> role,
                                                     @RequestParam Optional<Boolean> active,
                                                     @RequestParam Optional<Boolean> locked,
                                                     @RequestParam Optional<Long> page,
                                                     @RequestParam Optional<Long> limit) {
        var skip0 = skip(0L);
        var userIdAgg = userId.isPresent() ? match(new Criteria("_id").is(new ObjectId(userId.get()))) : skip0;
        var emailAgg = email.isPresent() ? match(new Criteria("email").regex(email.orElse(""))) : skip0;
        var roleAgg = role.isPresent() ? match(new Criteria("role").is(role.get())) : skip0;
        var activeAgg = active.isPresent() ? match(new Criteria("active").is(active.get())) : skip0;
        var lockedAgg = locked.isPresent() ? match(new Criteria("locked").is(locked.get())) : skip0;
        var skipAgg = (page.isPresent() && limit.isPresent()) ? skip(page.get() * limit.get()) : skip0;
        var limitAgg = limit.isPresent() ? limit(limit.get()) : skip0;

        var sortCriteria = sort(Sort.Direction.DESC, "joinDate").and(Sort.Direction.DESC, "email");
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
    public Mono<ResponseEntity<UserStatusUpdateData>> updateUser(@PathVariable String userId, @Valid @RequestBody UserStatusData data) {
        var update = userService.updateUserStatus(userId, data);
        return Mono.just(new ResponseEntity<>(update, OK));
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

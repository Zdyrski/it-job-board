package com.mzdyrski.itjobboard.controllers;

import com.mzdyrski.itjobboard.domain.Employee;
import com.mzdyrski.itjobboard.enums.ApplyState;
import com.mzdyrski.itjobboard.services.ApplicationService;
import com.mzdyrski.itjobboard.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.mail.MessagingException;
import java.io.IOException;

import static com.mzdyrski.itjobboard.enums.ApplyState.APPLIED;
import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@Service
@RestController
@RequestMapping(value = "/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    private final ApplicationService applicationService;
    private final UserService userService;

    @GetMapping("/{id}")
    public Mono<ResponseEntity<ApplyState>> canApplyForOffer(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable String id) {
        var user = userService.getUserFromTokenHeader(authorizationHeader);
        var applyState = applicationService.checkIfCanApply(user, id);
        return Mono.just(new ResponseEntity<>(applyState, OK));
    }

    @PostMapping("/{id}")
    public Mono<ResponseEntity<ApplyState>> applyForOffer(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable String id) throws MessagingException {
        var employee = (Employee) userService.getUserFromTokenHeader(authorizationHeader);
        applicationService.applyForOffer(employee, id);
        return Mono.just(new ResponseEntity<>(APPLIED, OK));
    }
}

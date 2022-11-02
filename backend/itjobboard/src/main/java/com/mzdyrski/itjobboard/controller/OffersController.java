package com.mzdyrski.itjobboard.controller;

import com.mzdyrski.itjobboard.dataTemplates.ListElOfferData;
import com.mzdyrski.itjobboard.domain.Offer;
import com.mzdyrski.itjobboard.service.OfferServiceImpl;
import com.mzdyrski.itjobboard.dataTemplates.OfferData;
import com.mzdyrski.itjobboard.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@Service
@RestController
@RequestMapping(value = "/offers")
@CrossOrigin(origins = "http://localhost:3000")
public class OffersController {

    private final OfferServiceImpl offerService;
    private final UserServiceImpl userService;

    @PostMapping("")
    public Mono<ResponseEntity<List<ListElOfferData>>> getOffers(){
        var offersList = offerService.getOffersByFilters();
        return Mono.just(new ResponseEntity<>(offersList, OK));
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity> getOffer(){
        var offerDetails = offerService.getOfferDetails("userId");
        return Mono.just(ResponseEntity.ok().body("offer for id"));
    }

    @PostMapping("/{id}")
    public Mono<ResponseEntity> applyForOffer(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable String id){
        var employee = userService.getUserFromTokenHeader(authorizationHeader);
        offerService.applyForOffer(employee, id);
        return Mono.just(new ResponseEntity<>(OK));
    }

    @GetMapping("/my-offers")
    public Mono<ResponseEntity<List<Offer>>> getMyOffers(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader){
        var user = userService.getUserFromTokenHeader(authorizationHeader);
        var userOffersList = offerService.getOffersByUser(user);
        return Mono.just(new ResponseEntity<>(userOffersList, OK));
    }

    @PostMapping("/add-offer")
    public Mono<ResponseEntity> addOffer(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody OfferData offerData){
        var employer = userService.getUserFromTokenHeader(authorizationHeader);
        offerService.addOffer(employer, offerData);
        return Mono.just(new ResponseEntity<>(OK));
    }
}

package com.mzdyrski.itjobboard.controller;

import com.mzdyrski.itjobboard.service.OfferService;
import com.mzdyrski.itjobboard.dataTemplates.OfferData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@Service
@RestController
public class OffersController {

    private final OfferService offerService;

    @PostMapping("/offers")
    public Mono<ResponseEntity> getOffers(){
        var offersList = offerService.getOffersByFilters();
        return Mono.just(ResponseEntity.ok().body("offers list"));
    }

    @GetMapping("/offer/{id}")
    public Mono<ResponseEntity> getOffer(){
        var offerDetails = offerService.getOfferDetails("userId");
        return Mono.just(ResponseEntity.ok().body("offer for id"));
    }

    @GetMapping("/apply/{id}")
    public Mono<ResponseEntity> applyForOffer(){
        offerService.applyForOffer("id");
        return Mono.just(ResponseEntity.ok().body("applied for offer"));
    }

    @GetMapping("/my-offers")
    public Mono<ResponseEntity> getMyOffers(){
        var userOffersList = offerService.getOffersByUserId("stringId");
        return Mono.just(ResponseEntity.ok().body("my offers list"));
    }

    @PostMapping("/add-offer")
    public Mono<ResponseEntity> addOffer(@RequestBody OfferData offerData){
        offerService.addOffer(offerData);
        return Mono.just(ResponseEntity.ok().body("offer added"));
    }
}

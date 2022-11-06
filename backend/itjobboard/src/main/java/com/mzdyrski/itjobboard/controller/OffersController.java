package com.mzdyrski.itjobboard.controller;

import com.mzdyrski.itjobboard.dataTemplates.ListElOfferData;
import com.mzdyrski.itjobboard.dataTemplates.OfferData;
import com.mzdyrski.itjobboard.dataTemplates.OfferDetailedData;
import com.mzdyrski.itjobboard.dataTemplates.TagData;
import com.mzdyrski.itjobboard.domain.Employee;
import com.mzdyrski.itjobboard.service.OfferServiceImpl;
import com.mzdyrski.itjobboard.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@Service
@RestController
@RequestMapping(value = "/offers")
@CrossOrigin(origins = "http://localhost:3000")
public class OffersController {

    private final OfferServiceImpl offerService;
    private final UserServiceImpl userService;

    @GetMapping("")
    public Mono<ResponseEntity<List<ListElOfferData>>> getOffers(@RequestParam Optional<String> title,
                                                                 @RequestParam Optional<String> city,
                                                                 @RequestParam(value = "skill") Optional<String[]> skills,
                                                                 @RequestParam Optional<String[]> remote,
                                                                 @RequestParam Optional<String[]> contract,
                                                                 @RequestParam Optional<String[]> expLevel) {
        var skip0 = skip(0L);
        var titleAgg = title.isPresent() ? match(new Criteria("title").regex(title.orElse(""))) : skip0;
        var cityAgg = city.isPresent() ? match(new Criteria("address.city").regex(city.orElse(""))) : skip0;
        var skillsAgg = skills.isPresent() ? match(new Criteria("techStack.skillName").all(skills.get())) : skip0;
        var remoteAgg = remote.isPresent() ? match(new Criteria("remote").in(remote.get())) : skip0;
        var contractAgg = contract.isPresent() ? match(new Criteria("contracts.name").in(contract.get())) : skip0;
        var expLevelAgg = expLevel.isPresent() ? match(new Criteria("experienceLevel").in(expLevel.get())) : skip0;

        var sortCriteria = Aggregation.sort(Sort.Direction.DESC, "date");

        var aggregation = newAggregation(
                titleAgg,
                cityAgg,
                skillsAgg,
                remoteAgg,
                contractAgg,
                expLevelAgg,
                sortCriteria
        );
        var offersList = offerService.getOffersByFilters2(aggregation);
        return Mono.just(new ResponseEntity<>(offersList, OK));
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<OfferDetailedData>> getOffer(@PathVariable String id) {
        var offerDetailed = offerService.getOfferDetails(id);
        return Mono.just(new ResponseEntity<>(offerDetailed, OK));
    }

    @GetMapping("/{id}/application")
    public Mono<ResponseEntity> canApplyForOffer(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable String id) {
        var user = userService.getUserFromTokenHeader(authorizationHeader);
        var x = offerService.checkIfCanApply(user, id);
        return Mono.just(new ResponseEntity<>(x, OK));
    }

    @PostMapping("/{id}/application")
    public Mono<ResponseEntity> applyForOffer(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable String id) throws MessagingException, IOException {
        var employee = (Employee) userService.getUserFromTokenHeader(authorizationHeader);
        offerService.applyForOffer(employee, id);
        return Mono.just(new ResponseEntity<>(OK));
    }

    @GetMapping("/my-offers")
    public Mono<ResponseEntity<List<ListElOfferData>>> getMyOffers(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        var user = userService.getUserFromTokenHeader(authorizationHeader);
        var userOffersList = offerService.getOffersByUser(user);
        return Mono.just(new ResponseEntity<>(userOffersList, OK));
    }

    @PostMapping("/add-offer")
    public Mono<ResponseEntity> addOffer(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody OfferData offerData) throws MessagingException, IOException {
        var employer = userService.getUserFromTokenHeader(authorizationHeader);
        offerService.addOffer(employer, offerData);
        return Mono.just(new ResponseEntity<>(OK));
    }

    @GetMapping("/tags")
    public Mono<ResponseEntity<String[]>> getTags() {
        var tags = offerService.getAllTags();
        return Mono.just(new ResponseEntity<>(tags, OK));
    }

    @PostMapping("/tags")
    public Mono<ResponseEntity> addTag(@RequestBody TagData data) {
        offerService.addTag(data);
        return Mono.just(new ResponseEntity<>(data, OK));
    }
}

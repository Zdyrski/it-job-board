package com.mzdyrski.itjobboard.controllers;

import com.mzdyrski.itjobboard.dataTemplates.*;
import com.mzdyrski.itjobboard.domain.Offer;
import com.mzdyrski.itjobboard.domain.User;
import com.mzdyrski.itjobboard.enums.ExperienceLevel;
import com.mzdyrski.itjobboard.enums.RemoteState;
import com.mzdyrski.itjobboard.exceptions.BadRequestDataException;
import com.mzdyrski.itjobboard.exceptions.OfferNotAvailableException;
import com.mzdyrski.itjobboard.services.OfferService;
import com.mzdyrski.itjobboard.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.mail.MessagingException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.mzdyrski.itjobboard.enums.ApprovalState.APPROVED;
import static com.mzdyrski.itjobboard.enums.Role.ROLE_EMPLOYEE;
import static com.mzdyrski.itjobboard.enums.Role.ROLE_EMPLOYER;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@Service
@RestController
@RequestMapping(value = "/offers")
@CrossOrigin(origins = "http://localhost:3000")
public class OfferController {

    private final OfferService offerService;
    private final UserService userService;

    @GetMapping("")
    public Mono<ResponseEntity<List<ListElOfferData>>> getOffers(@RequestParam Optional<String> title,
                                                                 @RequestParam Optional<String> city,
                                                                 @RequestParam(value = "skill") Optional<String[]> skills,
                                                                 @RequestParam Optional<RemoteState[]> remote,
                                                                 @RequestParam Optional<String[]> contract,
                                                                 @RequestParam Optional<ExperienceLevel[]> expLevel,
                                                                 @RequestParam Optional<Long> page,
                                                                 @RequestParam Optional<Long> limit) {
        var skip0 = skip(0L);
        var titleAgg = title.isPresent() ? match(new Criteria("title").regex(title.orElse(""))) : skip0;
        var cityAgg = city.isPresent() ? match(new Criteria("address.city").regex(city.orElse(""))) : skip0;
        var skillsAgg = skills.isPresent() ? match(new Criteria("techStack.skillName").all(skills.get())) : skip0;
        var remoteAgg = remote.isPresent() ?
                match(new Criteria("remoteStatus").in(Arrays.stream(remote.get()).map(el -> el.value).collect(Collectors.toList()))) : skip0;
        var contractAgg = contract.isPresent() ? match(new Criteria("contracts.name").in(contract.get())) : skip0;
        var expLevelAgg = expLevel.isPresent() ?
                match(new Criteria("experienceLevel").in(Arrays.stream(expLevel.get()).map(el -> el.value).collect(Collectors.toList()))) : skip0;
        var approvalStatusAgg = match(new Criteria("approvalStatus").is(APPROVED.value));
        var archivedAgg = match(new Criteria("archived").is(false));

        var skipAgg = (page.isPresent() && limit.isPresent()) ? skip(page.get() * limit.get()) : skip0;
        var limitAgg = limit.isPresent() ? limit(limit.get()) : skip0;
        var sortCriteria = sort(Sort.Direction.DESC, "date");

        var aggregation = newAggregation(
                approvalStatusAgg,
                archivedAgg,
                titleAgg,
                cityAgg,
                skillsAgg,
                remoteAgg,
                contractAgg,
                expLevelAgg,
                sortCriteria,
                skipAgg,
                limitAgg
        );
        var offersList = offerService.getOffersByFilters(aggregation);
        return Mono.just(new ResponseEntity<>(offersList, OK));
    }

    @PostMapping("")
    public Mono<ResponseEntity<Offer>> addOffer(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody OfferData data) throws MessagingException {
        System.out.println("xd");
        var employer = userService.getUserFromTokenHeader(authorizationHeader);
        offerService.addOffer(employer, data);
        return Mono.just(new ResponseEntity<>(CREATED));
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<OfferDetailedData>> getOffer(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorizationHeader, @PathVariable String id) throws OfferNotAvailableException {
        User user = null;
        if (authorizationHeader != null) {
            user = userService.getUserFromTokenHeader(authorizationHeader);
        }
        var offerDetailed = offerService.getOfferDetails(id, user);
        return Mono.just(new ResponseEntity<>(offerDetailed, OK));
    }

    @GetMapping("/my-offers")
    public Mono<ResponseEntity> getMyOffers(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) throws BadRequestDataException {
        var user = userService.getUserFromTokenHeader(authorizationHeader);
        if(Objects.equals(user.getRole(), ROLE_EMPLOYER.name())){
            var userOffersList = offerService.getOffersByEmployer(user);
            return Mono.just(new ResponseEntity<>(userOffersList, OK));
        }else if(Objects.equals(user.getRole(), ROLE_EMPLOYEE.name())){
            var userOffersList = offerService.getOffersByEmployee(user);
            return Mono.just(new ResponseEntity<>(userOffersList, OK));
        }
        throw new BadRequestDataException("Wrong role");
    }

    @GetMapping("/admin")
    public Mono<ResponseEntity<List<ListElWithStatusOfferData>>> getAdminOffers(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
                                                                                @RequestParam Optional<String> title,
                                                                                @RequestParam Optional<String> city,
                                                                                @RequestParam(value = "skill") Optional<String[]> skills,
                                                                                @RequestParam Optional<RemoteState[]> remote,
                                                                                @RequestParam Optional<String[]> contract,
                                                                                @RequestParam Optional<ExperienceLevel[]> expLevel,
                                                                                @RequestParam Optional<Integer> approvalStatus,
                                                                                @RequestParam Optional<Boolean> archived,
                                                                                @RequestParam Optional<Long> page,
                                                                                @RequestParam Optional<Long> limit) {
        var skip0 = skip(0L);
        var titleAgg = title.isPresent() ? match(new Criteria("title").regex(title.orElse(""))) : skip0;
        var cityAgg = city.isPresent() ? match(new Criteria("address.city").regex(city.orElse(""))) : skip0;
        var skillsAgg = skills.isPresent() ? match(new Criteria("techStack.skillName").all(skills.get())) : skip0;
        var remoteAgg = remote.isPresent() ?
                match(new Criteria("remoteStatus").in(Arrays.stream(remote.get()).map(el -> el.value).collect(Collectors.toList()))) : skip0;
        var contractAgg = contract.isPresent() ? match(new Criteria("contracts.name").in(contract.get())) : skip0;
        var expLevelAgg = expLevel.isPresent() ?
                match(new Criteria("experienceLevel").in(Arrays.stream(expLevel.get()).map(el -> el.value).collect(Collectors.toList()))) : skip0;
        var approvalStatusAgg = approvalStatus.isPresent() ? match(new Criteria("approvalStatus").is(approvalStatus.get())) : skip0;
        var archivedAgg = archived.isPresent() ? match(new Criteria("archived").is(archived.get())) : skip0;

        var skipAgg = (page.isPresent() && limit.isPresent()) ? skip(page.get() * limit.get()) : skip0;
        var limitAgg = limit.isPresent() ? limit(limit.get()) : skip0;
        var sortCriteria = sort(Sort.Direction.DESC, "date");

        var aggregation = newAggregation(
                approvalStatusAgg,
                archivedAgg,
                titleAgg,
                cityAgg,
                skillsAgg,
                remoteAgg,
                contractAgg,
                expLevelAgg,
                sortCriteria,
                skipAgg,
                limitAgg
        );
        var offersList = offerService.getOffersByAdminFilters(aggregation);
        return Mono.just(new ResponseEntity<>(offersList, OK));
    }

    @PostMapping("/admin/{id}")
    public Mono<ResponseEntity> approveOffer(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable String id, @RequestBody OfferStatusData data) {
        var admin = userService.getUserFromTokenHeader(authorizationHeader);
        offerService.setOfferStatus(admin, id, data);
        return Mono.just(new ResponseEntity<>(OK));
    }
}

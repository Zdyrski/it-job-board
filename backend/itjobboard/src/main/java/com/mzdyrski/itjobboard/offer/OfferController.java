package com.mzdyrski.itjobboard.offer;

import com.mzdyrski.itjobboard.exception.BadRequestDataException;
import com.mzdyrski.itjobboard.exception.OfferNotAvailableException;
import com.mzdyrski.itjobboard.offer.dto.*;
import com.mzdyrski.itjobboard.user.User;
import com.mzdyrski.itjobboard.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.mzdyrski.itjobboard.offer.ApprovalState.APPROVED;
import static com.mzdyrski.itjobboard.user.Role.ROLE_EMPLOYEE;
import static com.mzdyrski.itjobboard.user.Role.ROLE_EMPLOYER;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@Validated
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
        var sortCriteria = sort(Sort.Direction.DESC, "date").and(Sort.Direction.DESC, "title");

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
    public Mono<ResponseEntity<String>> addOffer(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @Valid @RequestBody OfferData data) throws MessagingException {
        var employer = userService.getUserFromTokenHeader(authorizationHeader);
        var newOfferId = offerService.addOffer(employer, data);
        return Mono.just(new ResponseEntity<>(newOfferId, CREATED));
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
        if (Objects.equals(user.getRole(), ROLE_EMPLOYER.name())) {
            var userOffersList = offerService.getOffersByEmployer(user);
            return Mono.just(new ResponseEntity<>(userOffersList, OK));
        } else if (Objects.equals(user.getRole(), ROLE_EMPLOYEE.name())) {
            var userOffersList = offerService.getOffersByEmployee(user);
            return Mono.just(new ResponseEntity<>(userOffersList, OK));
        }
        throw new BadRequestDataException("Wrong role");
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity> archiveOffer(@PathVariable String id) {
        offerService.archiveOffer(id);
        return Mono.just(new ResponseEntity<>(id, OK));
    }

    @GetMapping("/admin")
    public Mono<ResponseEntity<List<ListElWithStatusOfferData>>> getAdminOffers(@RequestParam Optional<String> title,
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
        var sortCriteria = sort(Sort.Direction.DESC, "date").and(Sort.Direction.DESC, "title");

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
    public Mono<ResponseEntity> approveOffer(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable String id, @Valid @RequestBody OfferStatusData data) throws MessagingException {
        var admin = userService.getUserFromTokenHeader(authorizationHeader);
        offerService.setOfferStatus(admin, id, data);
        return Mono.just(new ResponseEntity<>(OK));
    }
}

package com.mzdyrski.itjobboard.offer;

import com.mzdyrski.itjobboard.TestBase;
import com.mzdyrski.itjobboard.application.Application;
import com.mzdyrski.itjobboard.offer.dto.*;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;

import static com.mzdyrski.itjobboard.offer.ApprovalState.APPROVED;
import static com.mzdyrski.itjobboard.offer.ApprovalState.DISAPPROVED;
import static com.mzdyrski.itjobboard.offer.ExperienceLevel.MEDIUM;
import static com.mzdyrski.itjobboard.offer.RemoteState.FULL_TIME;
import static com.mzdyrski.itjobboard.security.SecurityConstants.TOKEN_HEADER;
import static org.assertj.core.api.Assertions.assertThat;

class OfferControllerIntegrationTests extends TestBase {

    @Test
    public void shouldReturnListOfOffers() {
        // given, when, then
        webTestClient.get()
                .uri("/offers")
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(ListElOfferData.class).hasSize(1);
    }

    @Test
    public void shouldSaveOffer() {
        // given
        var employerToken = getEmployerToken();
        var givenTitle = "title2";
        var givenOfferData = new OfferData(givenTitle,
                new AddressData("country", "city", "street"),
                FULL_TIME,
                new ContractData[]{new ContractData("employment", true, 0, 0)},
                MEDIUM,
                new SkillData[]{new SkillData("1", 1), new SkillData("2", 2), new SkillData("3", 3)},
                "description");

        // when, then
        webTestClient.post()
                .uri("/offers")
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER + employerToken)
                .body(BodyInserters.fromValue(givenOfferData))
                .exchange()
                .expectStatus().isCreated();

        assertThat(mongoTemplate.find(new Query(new Criteria("title").is(givenTitle)), Offer.class, "offers"))
                .extracting("title").containsOnly(givenTitle);
    }

    @Test
    public void shouldReturnBadRequestForInvalidOffer() {
        // given
        var employerToken = getEmployerToken();
        var givenTitle = "title2";
        var givenOfferData = new OfferData(givenTitle,
                new AddressData("country", "city", "street"),
                FULL_TIME,
                new ContractData[]{},
                MEDIUM,
                new SkillData[]{},
                "description");

        // when, then
        webTestClient.post()
                .uri("/offers")
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER + employerToken)
                .body(BodyInserters.fromValue(givenOfferData))
                .exchange()
                .expectStatus().isBadRequest();

        assertThat(mongoTemplate.find(new Query(new Criteria("title").is(givenTitle)), Offer.class, "offers"))
                .extracting("title").isEmpty();
    }

    @Test
    public void shouldReturnDetailedOffer() {
        // given, when, then
        webTestClient.get()
                .uri("/offers/offerId")
                .exchange()
                .expectStatus().isOk()
                .expectBody(OfferDetailedData.class);
    }

    @Test
    public void shouldReturnListOfOffersAppliedByEmployee() {
        //given
        var employeeToken = getEmployeeToken();
        addApplicationForEmployee();

        // when, then
        webTestClient.get()
                .uri("/offers/my-offers")
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER + employeeToken)
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(ListElOfferData.class)
                .hasSize(1);
    }

    @Test
    public void shouldReturnListOfOffersCreatedByEmployer() {
        // given
        var employerToken = getEmployerToken();

        // when, then
        webTestClient.get()
                .uri("/offers/my-offers")
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER + employerToken)
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(ListElWithStatusOfferData.class)
                .hasSize(1);
    }

    @Test
    public void adminShouldChangeOfferStatus() {
        // given
        var adminToken = getAdminToken();
        var newOfferStatus = new OfferStatusData(DISAPPROVED.value, true);

        // when
        assertThat(mongoTemplate.findOne(new Query(new Criteria("id").is("offerId")), Offer.class, "offers"))
                .extracting("approvalStatus", "archived").containsOnly(APPROVED.value, false);

        // then
        webTestClient.post()
                .uri("/offers/admin/offerId")
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER + adminToken)
                .body(BodyInserters.fromValue(newOfferStatus))
                .exchange()
                .expectStatus().isOk();

        assertThat(mongoTemplate.findOne(new Query(new Criteria("id").is("offerId")), Offer.class, "offers"))
                .extracting("approvalStatus", "archived").containsOnly(DISAPPROVED.value, true);
    }

    private void addApplicationForEmployee() {
        var application = new Application();
        application.setOfferId("offerId");
        application.setUserId("employeeId");
        mongoTemplate.save(application, "applications");
    }

}
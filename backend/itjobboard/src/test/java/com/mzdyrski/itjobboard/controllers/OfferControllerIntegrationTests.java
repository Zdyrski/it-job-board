package com.mzdyrski.itjobboard.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mzdyrski.itjobboard.TestBase;
import com.mzdyrski.itjobboard.dataTemplates.AddressData;
import com.mzdyrski.itjobboard.dataTemplates.ContractData;
import com.mzdyrski.itjobboard.dataTemplates.OfferData;
import com.mzdyrski.itjobboard.dataTemplates.SkillData;
import com.mzdyrski.itjobboard.domain.Employee;
import com.mzdyrski.itjobboard.domain.Offer;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;

import static com.mzdyrski.itjobboard.constants.SecurityConstants.TOKEN_HEADER;
import static com.mzdyrski.itjobboard.enums.ExperienceLevel.MEDIUM;
import static com.mzdyrski.itjobboard.enums.RemoteState.FULL_TIME;
import static org.assertj.core.api.Assertions.assertThat;

class OfferControllerIntegrationTests extends TestBase {

    @Test
    public void shouldReturnListOfOffers() {
        // given, when, then
        webTestClient.get()
                .uri("/offers")
                .exchange()
                .expectStatus().isOk();
    }

    @Test
    public void shouldSaveOffer() {
        // given
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
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER + getEmployerToken())
                .body(BodyInserters.fromValue(givenOfferData))
                .exchange()
                .expectStatus().isCreated();

        assertThat(mongoTemplate.find(new Query(new Criteria("title").is(givenTitle)),
                Offer.class, "offers")).extracting("title").containsOnly(givenTitle);
    }

    @Test
    public void shouldReturnDetailedOffer() {
        // given, when, then
        webTestClient.get()
                .uri("/offers/offerId")
                .exchange()
                .expectStatus().isOk();
    }

}
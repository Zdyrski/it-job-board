package com.mzdyrski.itjobboard.controllers;

import com.mzdyrski.itjobboard.TestBase;
import com.mzdyrski.itjobboard.domain.Application;
import com.mzdyrski.itjobboard.domain.EmployeesCv;
import com.mzdyrski.itjobboard.enums.ApplyState;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;

import static com.mzdyrski.itjobboard.constants.SecurityConstants.TOKEN_HEADER;
import static com.mzdyrski.itjobboard.enums.ApplyState.*;
import static org.assertj.core.api.Assertions.assertThat;

class ApplicationControllerIntegrationTest extends TestBase {

    @Test
    public void shouldReturnNoCVForEmployeeWithoutCV() {
        // given
        var employeeToken = getEmployeeToken();

        // when, then
        webTestClient.get()
                .uri("/applications/offerId")
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER + employeeToken)
                .exchange()
                .expectStatus().isOk()
                .expectBody(ApplyState.class).isEqualTo(NO_CV);
    }

    @Test
    public void shouldReturnCantApplyForEmployer() {
        // given
        var employerToken = getEmployerToken();

        // when, then
        webTestClient.get()
                .uri("/applications/offerId")
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER + employerToken)
                .exchange()
                .expectStatus().isOk()
                .expectBody(ApplyState.class).isEqualTo(CANT_APPLY);
    }

    @Test
    public void shouldReturnCanApplyForEmployeeWithCv() {
        // given
        var employeeToken = getEmployeeToken();
        givenCvForEmployee();

        // when, then
        webTestClient.get()
                .uri("/applications/offerId")
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER + employeeToken)
                .exchange()
                .expectStatus().isOk()
                .expectBody(ApplyState.class).isEqualTo(CAN_APPLY);
    }

    @Test
    public void shouldReturnAppliedAfterEmployeeWithCvApplies() {
        // given
        var employeeToken = getEmployeeToken();
        givenCvForEmployee();

        // when, then
        webTestClient.post()
                .uri("/applications/offerId")
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER + employeeToken)
                .exchange()
                .expectStatus().isOk()
                .expectBody(ApplyState.class).isEqualTo(APPLIED);
        assertThat(mongoTemplate.find(new Query(new Criteria("offerId").is("offerId")),
                Application.class, "applications")).extracting("userId").contains("employeeId");
    }

    private void givenCvForEmployee() {
        var cv = new EmployeesCv();
        cv.setEmployeeId("employeeId");
        mongoTemplate.save(cv, "employees_cvs");
    }

}
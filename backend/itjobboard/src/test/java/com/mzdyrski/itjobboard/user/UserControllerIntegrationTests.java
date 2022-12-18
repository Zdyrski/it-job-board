package com.mzdyrski.itjobboard.user;

import com.mzdyrski.itjobboard.TestBase;
import com.mzdyrski.itjobboard.user.dto.LoginData;
import com.mzdyrski.itjobboard.user.dto.RegisterData;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;

import static com.mzdyrski.itjobboard.security.SecurityConstants.JWT_TOKEN_HEADER;
import static org.assertj.core.api.Assertions.assertThat;

class UserControllerIntegrationTests extends TestBase {

    @Test
    public void registerEmployeeTest() {
        // given
        var givenEmail = "employee2";
        var givenRole = "ROLE_EMPLOYEE";
        var givenRegisterData = getUser(givenEmail, givenRole);

        // when, then
        webTestClient.post()
                .uri("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(givenRegisterData))
                .exchange()
                .expectStatus().isCreated();
        assertThat(getUserInDb(givenEmail)).extracting("email").isEqualTo(givenEmail);
    }

    @Test
    public void registerAndConfirmationTokenTest() {
        // given
        var givenEmail = "employee2";
        var givenRole = "ROLE_EMPLOYEE";
        var givenRegisterData = getUser(givenEmail, givenRole);

        // when
        webTestClient.post()
                .uri("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(givenRegisterData))
                .exchange()
                .expectStatus().isCreated();
        var registeredUser = getUserInDb(givenEmail);
        assertThat(registeredUser).extracting("active").isEqualTo(false);
        var token = getConfirmationToken(registeredUser.getId()).getToken();

        // then
        webTestClient.get()
                .uri("/user/register/confirm?token=" + token)
                .exchange()
                .expectStatus().isOk();
        assertThat(getUserInDb(givenEmail)).extracting("active").isEqualTo(true);
    }

    @Test
    public void registerEmployerTest() {
        // given
        var givenEmail = "employer2";
        var givenRole = "ROLE_EMPLOYER";
        var givenRegisterData = getUser(givenEmail, givenRole);

        // when, then
        webTestClient.post()
                .uri("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(givenRegisterData))
                .exchange()
                .expectStatus().isCreated();
        assertThat(getUserInDb(givenEmail)).extracting("email").isEqualTo(givenEmail);
    }

    @Test
    public void registerShouldFailWhenUserExists() {
        // given
        var givenEmail = "employee";
        var givenRole = "ROLE_EMPLOYEE";
        var givenRegisterData = getUser(givenEmail, givenRole);

        // when, then
        assertThat(getUserInDb(givenEmail)).extracting("email").isEqualTo(givenEmail);
        webTestClient.post()
                .uri("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(givenRegisterData))
                .exchange()
                .expectStatus().isBadRequest();
    }

    @Test
    public void loginShouldReturnToken() {
        // given
        var givenEmail = "employee";
        var givenPassword = "password";
        var givenLoginData = new LoginData(givenEmail, givenPassword);

        // when, then
        webTestClient.post()
                .uri("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(givenLoginData))
                .exchange()
                .expectStatus().isOk()
                .expectHeader().exists(JWT_TOKEN_HEADER);
    }

    @Test
    public void failedLoginShouldReturnBadRequest() {
        // given
        var givenEmail = "employee";
        var givenPassword = "password2";
        var givenLoginData = new LoginData(givenEmail, givenPassword);

        // when, then
        webTestClient.post()
                .uri("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(givenLoginData))
                .exchange()
                .expectStatus().isBadRequest();
    }

    private User getUserInDb(String givenEmail) {
        return mongoTemplate.findOne(new Query(new Criteria("email").is(givenEmail)), Employee.class, "users");
    }

    private ConfirmationToken getConfirmationToken(String userId) {
        return mongoTemplate.findOne(new Query(new Criteria("userId").is(userId)), ConfirmationToken.class, "confirmation_tokens");
    }

    private RegisterData getUser(String email, String role) {
        return new RegisterData(
                email,
                "1",
                role,
                "firstName",
                "lastName",
                "companyName",
                "companySiteUrl",
                1L,
                "companyLogoUrl");
    }
}
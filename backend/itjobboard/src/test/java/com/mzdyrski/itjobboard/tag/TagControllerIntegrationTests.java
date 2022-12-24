package com.mzdyrski.itjobboard.tag;

import com.mzdyrski.itjobboard.TestBase;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;

import java.util.List;

import static com.mzdyrski.itjobboard.security.SecurityConstants.TOKEN_HEADER;
import static org.assertj.core.api.Assertions.assertThat;

public class TagControllerIntegrationTests extends TestBase {

    @Test
    public void addTag() {
        // given
        var adminToken = getAdminToken();
        var givenTag = new TagData("givenTag");

        // when, then
        webTestClient.post()
                .uri("/tags/admin")
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER + adminToken)
                .body(BodyInserters.fromValue(givenTag))
                .exchange()
                .expectStatus().isCreated();
        assertThat(getTagsInDb()).extracting("name").isEqualTo(List.of("givenTag"));
    }

    @Test
    public void getTags() {
        // given
        var givenTagName = "givenTag";
        saveTagWithGivenName(givenTagName);

        // when, then
        webTestClient.get()
                .uri("/tags")
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(String.class)
                .hasSize(1);
    }


    private List<Tag> getTagsInDb() {
        return mongoTemplate.findAll(Tag.class, "tags");
    }

    private void saveTagWithGivenName(String name){
        var tag = new Tag();
        tag.setName(name);
        mongoTemplate.save(tag, "tags");
    }

}

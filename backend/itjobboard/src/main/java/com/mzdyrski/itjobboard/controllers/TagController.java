package com.mzdyrski.itjobboard.controllers;

import com.mzdyrski.itjobboard.dataTemplates.TagData;
import com.mzdyrski.itjobboard.domain.Tag;
import com.mzdyrski.itjobboard.services.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@Service
@RestController
@RequestMapping(value = "/tags")
@CrossOrigin(origins = "http://localhost:3000")
public class TagController {

    private final TagService tagService;

    @GetMapping("")
    public Mono<ResponseEntity<String[]>> getTags() {
        var tags = tagService.getAllTags();
        return Mono.just(new ResponseEntity<>(tags, OK));
    }

    @PostMapping("")
    public Mono<ResponseEntity<Tag>> addTag(@RequestBody TagData data) {
        tagService.addTag(data);
        return Mono.just(new ResponseEntity<>(CREATED));
    }
}

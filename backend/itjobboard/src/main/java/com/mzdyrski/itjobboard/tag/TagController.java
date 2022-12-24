package com.mzdyrski.itjobboard.tag;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.Arrays;

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

    @PostMapping("/admin")
    public Mono<ResponseEntity<Tag>> addTag(@Valid @RequestBody TagData data) {
        tagService.addTag(data);
        return Mono.just(new ResponseEntity<>(CREATED));
    }
}

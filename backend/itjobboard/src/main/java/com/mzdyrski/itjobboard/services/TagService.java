package com.mzdyrski.itjobboard.services;

import com.mzdyrski.itjobboard.dataTemplates.TagData;
import com.mzdyrski.itjobboard.domain.Tag;
import com.mzdyrski.itjobboard.domain.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TagService {

    final private TagRepository tagRepository;

    public String[] getAllTags() {
        return tagRepository.findAll().stream().map(Tag::getName).toArray(String[]::new);
    }

    public void addTag(TagData tagData) {
        var newTag = new Tag();
        newTag.setName(tagData.name());
        tagRepository.save(newTag);
    }
}

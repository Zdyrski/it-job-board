package com.mzdyrski.itjobboard.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "tags")
@NoArgsConstructor
public class Tag {
    @Id
    private String id;
    private String name;
}

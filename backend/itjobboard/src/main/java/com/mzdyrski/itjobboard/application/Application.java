package com.mzdyrski.itjobboard.application;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "applications")
@CompoundIndex(name = "application_index", def = "{'userId': 1, 'offerId': 1}", unique = true)
@NoArgsConstructor
public class Application {
    private String userId;
    private String offerId;
}

package com.mzdyrski.itjobboard.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.UUID;

@Data
@Document(collection = "confirmation_tokens")
@NoArgsConstructor
public class ConfirmationToken {

    @Id
    private String id;
    private String userId;
    private String token;
    private Date issuedDate;

    public ConfirmationToken(String userId) {
        this.userId = userId;
        this.token = UUID.randomUUID().toString();
        this.issuedDate = new Date();
    }
}

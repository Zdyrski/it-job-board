package com.mzdyrski.itjobboard.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "users")
@NoArgsConstructor
public class Employer extends User{

    @Indexed(unique=true)
    private String companyName;
    private String companyLogoUrl;
    private String companySiteUrl;
    private Long companySize;
}

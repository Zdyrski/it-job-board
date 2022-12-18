package com.mzdyrski.itjobboard.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

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

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

    private String address;
    @Indexed(unique=true)
    private String companyName;
    private String companyLogoLink;
    private String companySiteLink;
    private Long companySize;

    public Employer(String email, String password, String role, String[] authorities, Date joinedDate, boolean isActive, boolean isNotLocked, String address, String companyName, String companyLogoLink, String companySiteLink, Long companySize) {
        super(email, password, role, authorities, joinedDate, isActive, isNotLocked);
        this.address = address;
        this.companyName = companyName;
        this.companyLogoLink = companyLogoLink;
        this.companySiteLink = companySiteLink;
        this.companySize = companySize;
    }
}

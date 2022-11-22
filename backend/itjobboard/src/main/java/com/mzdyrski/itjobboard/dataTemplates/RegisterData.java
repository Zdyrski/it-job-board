package com.mzdyrski.itjobboard.dataTemplates;

public record RegisterData(String email,
                           String password,
                           String role,
                           String firstName,
                           String lastName,
                           String companyName,
                           String companySiteUrl,
                           Long companySize,
                           String companyLogoUrl) {
}

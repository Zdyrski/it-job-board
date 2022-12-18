package com.mzdyrski.itjobboard.user.dto;

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

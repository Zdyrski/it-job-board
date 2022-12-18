package com.mzdyrski.itjobboard.user.dto;

public record UserUpdateData(String firstName,
                             String lastName,
                             String companyName,
                             Long companySize,
                             String companySiteUrl,
                             String companyLogoUrl) {
}

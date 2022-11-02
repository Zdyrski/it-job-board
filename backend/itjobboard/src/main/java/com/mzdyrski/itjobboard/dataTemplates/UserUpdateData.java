package com.mzdyrski.itjobboard.dataTemplates;

public record UserUpdateData(String firstName,
                             String lastName,
                             String companyName,
                             Long companySize,
                             String companySiteUrl,
                             String companyLogoUrl) {
}

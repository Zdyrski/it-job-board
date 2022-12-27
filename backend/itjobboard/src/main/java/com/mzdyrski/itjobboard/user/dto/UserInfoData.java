package com.mzdyrski.itjobboard.user.dto;

import java.util.Date;

public record UserInfoData(String email,
                           String role,
                           Date joinDate,
                           String firstName,
                           String lastName,
                           String cvFileName,
                           String companyName,
                           String companyLogoUrl,
                           String companySiteUrl,
                           Long companySize) {
}

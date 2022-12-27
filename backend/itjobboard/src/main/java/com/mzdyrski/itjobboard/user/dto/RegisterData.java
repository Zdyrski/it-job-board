package com.mzdyrski.itjobboard.user.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record RegisterData(@Email String email,
                           @NotBlank String password,
                           @NotBlank String role,
                           String firstName,
                           String lastName,
                           String companyName,
                           String companySiteUrl,
                           Long companySize,
                           String companyLogoUrl) {
}

package com.mzdyrski.itjobboard.user.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record RegisterData(@Email String email,
                           @NotBlank String password,
                           @NotBlank String role,
                           @NotBlank String firstName,
                           @NotBlank String lastName,
                           @NotBlank String companyName,
                           @NotBlank String companySiteUrl,
                           @NotNull Long companySize,
                           @NotBlank String companyLogoUrl) {
}

package com.mzdyrski.itjobboard.user.dto;

import javax.validation.constraints.NotBlank;

public record ChangePasswordData(@NotBlank String oldPassword,
                                 @NotBlank String newPassword) {
}

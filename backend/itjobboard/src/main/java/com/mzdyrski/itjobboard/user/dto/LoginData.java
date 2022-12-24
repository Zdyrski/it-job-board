package com.mzdyrski.itjobboard.user.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record LoginData(@Email String email,
                        @NotBlank String password) {
}

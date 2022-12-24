package com.mzdyrski.itjobboard.user.dto;

import javax.validation.constraints.Email;

public record ResetPasswordData(@Email String email) {
}

package com.mzdyrski.itjobboard.user.dto;

import javax.validation.constraints.NotNull;

public record UserStatusData(@NotNull Boolean active,
                             @NotNull Boolean locked) {
}

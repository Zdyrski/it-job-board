package com.mzdyrski.itjobboard.offer.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record SkillData(@NotBlank String skillName,
                        @NotNull @Min(1) @Max(5) Integer level) {
}

package com.mzdyrski.itjobboard.offer.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record ContractData(@NotBlank String name,
                           boolean undisclosed,
                           @Min(0) @Max(100000) Integer minMoney,
                           @Min(0) @Max(100000) Integer maxMoney) {
}

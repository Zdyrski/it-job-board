package com.mzdyrski.itjobboard.offer.dto;

import javax.validation.constraints.NotBlank;

public record AddressData(@NotBlank String country,
                          @NotBlank String city,
                          @NotBlank String street) {
}

package com.mzdyrski.itjobboard.tag;

import javax.validation.constraints.NotBlank;

public record TagData(@NotBlank String name) {
}

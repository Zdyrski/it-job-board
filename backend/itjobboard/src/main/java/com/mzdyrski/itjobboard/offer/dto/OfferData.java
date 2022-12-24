package com.mzdyrski.itjobboard.offer.dto;

import com.mzdyrski.itjobboard.offer.ExperienceLevel;
import com.mzdyrski.itjobboard.offer.RemoteState;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public record OfferData(@NotBlank String title,
                        @Valid @NotNull AddressData address,
                        @NotNull RemoteState remoteStatus,
                        @Valid @NotNull @Size(min=1, max=4) ContractData[] contracts,
                        @NotNull ExperienceLevel experienceLevel,
                        @Valid @NotNull @Size(min=3, max=10)SkillData[] techStack,
                        @NotBlank String description) {
}

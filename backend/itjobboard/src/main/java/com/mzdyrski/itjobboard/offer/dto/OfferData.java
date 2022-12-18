package com.mzdyrski.itjobboard.offer.dto;

import com.mzdyrski.itjobboard.offer.ExperienceLevel;
import com.mzdyrski.itjobboard.offer.RemoteState;

public record OfferData(String title,
                        AddressData address,
                        RemoteState remoteStatus,
                        ContractData[] contracts,
                        ExperienceLevel experienceLevel,
                        SkillData[] techStack,
                        String description) {
}

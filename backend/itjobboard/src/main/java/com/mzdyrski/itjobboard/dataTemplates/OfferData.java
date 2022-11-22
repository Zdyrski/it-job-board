package com.mzdyrski.itjobboard.dataTemplates;

import com.mzdyrski.itjobboard.enums.ExperienceLevel;
import com.mzdyrski.itjobboard.enums.RemoteState;

public record OfferData(String title,
                        AddressData address,
                        RemoteState remoteStatus,
                        ContractData[] contracts,
                        ExperienceLevel experienceLevel,
                        SkillData[] techStack,
                        String description) {
}

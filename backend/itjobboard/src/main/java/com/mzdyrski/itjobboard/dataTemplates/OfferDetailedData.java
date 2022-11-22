package com.mzdyrski.itjobboard.dataTemplates;

import com.mzdyrski.itjobboard.enums.ExperienceLevel;
import com.mzdyrski.itjobboard.enums.RemoteState;

import java.util.Date;

public record OfferDetailedData(String title,
                                String companyName,
                                Long companySize,
                                String companySiteUrl,
                                String companyLogoUrl,
                                AddressData addressData,
                                RemoteState remoteStatus,
                                ExperienceLevel experienceLevel,
                                Date date,
                                SkillData[] techStack,
                                ContractData[] contracts,
                                String description) {
}

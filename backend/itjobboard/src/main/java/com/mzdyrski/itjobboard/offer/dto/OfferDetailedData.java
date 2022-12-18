package com.mzdyrski.itjobboard.offer.dto;

import com.mzdyrski.itjobboard.offer.ExperienceLevel;
import com.mzdyrski.itjobboard.offer.RemoteState;

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

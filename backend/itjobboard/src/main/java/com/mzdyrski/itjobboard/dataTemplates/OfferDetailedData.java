package com.mzdyrski.itjobboard.dataTemplates;

import java.util.Date;

public record OfferDetailedData(String title,
                                String companyName,
                                Long companySize,
                                String companySiteUrl,
                                String companyLogoUrl,
                                String city,
                                String remote,
                                String experienceLevel,
                                Date date,
                                SkillData[] techStack,
                                ContractData[] contracts,
                                String description,
                                boolean canApply) {
}

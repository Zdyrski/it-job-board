package com.mzdyrski.itjobboard.dataTemplates;

public record OfferData(String title,
                        AddressData address,
                        String remote,
                        ContractData[] contracts,
                        String experienceLevel,
                        SkillData[] techStack,
                        String description) {
}

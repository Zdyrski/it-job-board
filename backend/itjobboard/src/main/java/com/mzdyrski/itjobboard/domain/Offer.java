package com.mzdyrski.itjobboard.domain;

import com.mzdyrski.itjobboard.dataTemplates.AddressData;
import com.mzdyrski.itjobboard.dataTemplates.ContractData;
import com.mzdyrski.itjobboard.dataTemplates.SkillData;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "offers")
@NoArgsConstructor
public class Offer {
    @Id
    private String id;
    private String employerId;
    private String title;
    private AddressData address;
    private Integer remoteStatus;
    private ContractData[] contracts;
    private String salaryShort;
    private Integer experienceLevel;
    private SkillData[] techStack;
    private String[] tags;
    private Date date;
    private String description;
    private Integer approvalStatus;
    private boolean archived;
}

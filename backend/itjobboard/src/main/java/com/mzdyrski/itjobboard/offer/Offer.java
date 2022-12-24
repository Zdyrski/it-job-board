package com.mzdyrski.itjobboard.offer;

import com.mzdyrski.itjobboard.offer.dto.AddressData;
import com.mzdyrski.itjobboard.offer.dto.ContractData;
import com.mzdyrski.itjobboard.offer.dto.SkillData;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Document(collection = "offers")
@NoArgsConstructor
public class Offer {
    @Id
    private String id;

    @NotBlank
    private String employerId;

    @NotBlank
    private String title;

    @NotNull
    private AddressData address;

    private Integer remoteStatus;

    @NotNull
    @Min(1)
    private ContractData[] contracts;

    @NotBlank
    private String salaryShort;

    @NotNull
    @Min(1) @Max(5)
    private Integer experienceLevel;

    @NotNull
    @Min(5)
    private SkillData[] techStack;

    @NotNull
    @Min(5)
    private String[] tags;

    private Date date;

    @NotBlank
    private String description;

    private Integer approvalStatus;

    private boolean archived;
}

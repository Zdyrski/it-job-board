package com.mzdyrski.itjobboard.dataTemplates;

import java.util.Date;

public record ListAdminElOfferData(String offerId,
                                   String title,
                                   String companyName,
                                   String companyLogoUrl,
                                   String city,
                                   String remote,
                                   String[] tags,
                                   String salary,
                                   Date date,
                                   Integer approvalStatus,
                                   boolean archived
) {
}
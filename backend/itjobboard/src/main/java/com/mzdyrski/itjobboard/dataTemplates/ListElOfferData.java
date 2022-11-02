package com.mzdyrski.itjobboard.dataTemplates;

import java.util.Date;

public record ListElOfferData(String offerId,
                              String title,
                              String companyName,
                              String companyLogoUrl,
                              String city,
                              String remote,
                              String[] tags,
                              String salary,
                              Date date
                              ) {
}

package com.mzdyrski.itjobboard.dataTemplates;

import com.mzdyrski.itjobboard.enums.RemoteState;

import java.util.Date;

public record ListElOfferData(String offerId,
                              String title,
                              String companyName,
                              String companyLogoUrl,
                              AddressData addressData,
                              RemoteState remoteStatus,
                              String[] tags,
                              String salary,
                              Date date
                              ) {
}

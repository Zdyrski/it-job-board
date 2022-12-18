package com.mzdyrski.itjobboard.offer.dto;

import com.mzdyrski.itjobboard.offer.RemoteState;

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

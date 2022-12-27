package com.mzdyrski.itjobboard.offer.dto;

public record OfferStatusUpdateData(String offerId,
                                    Integer approvalStatus,
                                    boolean archived) {
}

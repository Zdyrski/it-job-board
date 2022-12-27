package com.mzdyrski.itjobboard.user.dto;

public record UserStatusUpdateData(String userId,
                                   boolean locked,
                                   boolean active) {
}

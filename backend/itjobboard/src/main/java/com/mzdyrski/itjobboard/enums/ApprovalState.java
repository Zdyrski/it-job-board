package com.mzdyrski.itjobboard.enums;

public enum ApprovalState {
    DISAPPROVED(0),
    NOT_APPROVED(1),
    APPROVED(2);

    public final Integer value;

    ApprovalState(Integer value) {
        this.value = value;
    }
}

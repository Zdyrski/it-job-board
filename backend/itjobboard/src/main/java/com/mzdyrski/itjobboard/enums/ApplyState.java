package com.mzdyrski.itjobboard.enums;

public enum ApplyState {
    CANT_APPLY(0),
    CAN_APPLY(1),
    APPLIED(2),
    NO_CV(3);

    public final Integer value;

    ApplyState(Integer value) {
        this.value = value;
    }
}

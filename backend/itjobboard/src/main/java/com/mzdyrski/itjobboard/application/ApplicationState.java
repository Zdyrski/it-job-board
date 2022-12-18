package com.mzdyrski.itjobboard.application;

public enum ApplicationState {
    CANT_APPLY(0),
    CAN_APPLY(1),
    APPLIED(2),
    NO_CV(3);

    public final Integer value;

    ApplicationState(Integer value) {
        this.value = value;
    }
}

package com.mzdyrski.itjobboard.enums;

import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

public enum RemoteState {
    NO(0),
    PARTIAL(1),
    FULL_TIME(2);

    public final Integer value;

    RemoteState(Integer value) {
        this.value = value;
    }

    public static Optional<RemoteState> valueOf(Integer value) {
        return Arrays.stream(values())
                .filter(remoteState -> Objects.equals(remoteState.value, value))
                .findFirst();
    }
}

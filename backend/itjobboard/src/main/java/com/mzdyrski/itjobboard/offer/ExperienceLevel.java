package com.mzdyrski.itjobboard.offer;

import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

public enum ExperienceLevel {
    INTERN(1),
    JUNIOR(2),
    MEDIUM(3),
    SENIOR(4),
    EXPERT(5);

    public final Integer value;

    ExperienceLevel(Integer value) {
        this.value = value;
    }

    public static Optional<ExperienceLevel> valueOf(Integer value) {
        return Arrays.stream(values())
                .filter(experienceLevel -> Objects.equals(experienceLevel.value, value))
                .findFirst();
    }
}

package com.mzdyrski.itjobboard.enums;

import static com.mzdyrski.itjobboard.constants.Authority.*;

public enum Role {
    ROLE_EMPLOYEE(EMPLOYEE_AUTHORITIES),
    ROLE_EMPLOYER(EMPLOYER_AUTHORITIES),
    ROLE_ADMIN(ADMIN_AUTHORITIES);

    private final String[] authorities;

    Role(String... authorities) {
        this.authorities = authorities;
    }

    public String[] getAuthorities() {
        return authorities;
    }

}

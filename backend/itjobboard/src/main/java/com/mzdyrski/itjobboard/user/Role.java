package com.mzdyrski.itjobboard.user;

import static com.mzdyrski.itjobboard.user.Authority.*;

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

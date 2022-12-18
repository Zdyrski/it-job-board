package com.mzdyrski.itjobboard.user;

public class Authority {
    public static final String[] EMPLOYEE_AUTHORITIES = {"user:read", "user:update", "offer:read", "offer:apply"};
    public static final String[] EMPLOYER_AUTHORITIES = {"user:read", "user:update", "offer:read", "offer:create", "offer:update"};
    public static final String[] ADMIN_AUTHORITIES = {"user:read", "offer:read", "offer:approve", "offer:delete", "adminPanel:manage"};
}

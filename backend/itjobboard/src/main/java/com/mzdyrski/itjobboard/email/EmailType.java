package com.mzdyrski.itjobboard.email;

public enum EmailType {
    ACCOUNT_CREATED("ITJobBoard - confirm signing up"),
    APPLIED_EMPLOYEE("ITJobBoard - you applied for offer"),
    APPLIED_EMPLOYER("ITJobBoard - there is new application for your offer"),
    OFFER_ADDED("ITJobBoard - your offer has been added and awaits approval"),
    OFFER_APPROVED("ITJobBoard - your offer has been approved"),
    OFFER_DISAPPROVED("ITJobBoard - your offer has been rejected");

    public final String title;

    EmailType(String title) {
        this.title = title;
    }
}

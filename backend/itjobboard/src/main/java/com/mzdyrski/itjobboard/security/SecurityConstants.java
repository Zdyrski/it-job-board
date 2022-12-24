package com.mzdyrski.itjobboard.security;

public class SecurityConstants {
    public static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000;
    public static final String TOKEN_HEADER = "Bearer ";
    public static final String JWT_TOKEN_HEADER = "token";
    public static final String AUTHORITIES = "authorities";
    public static final String OPTIONS_HTTP_METHOD = "OPTIONS";
    public static final String PORTAL_NAME = "ItJobBoard";
    public static final String[] PUBLIC_URLS = {
            "/users/register",
            "/users/register/confirm",
            "/users/login",
            "/offers",
            "/offers/{\\[0-9a-z]+}",
            "/tags"
    };
    public static final String[] EMPLOYER_URLS = {"/offers/add"};

    public static final String[] EMPLOYER_PUT_URLS = {"/offers/{\\[0-9a-z]+}"};
    public static final String[] ADMIN_URLS = {
            "/offers/admin",
            "/offers/admin/{\\[0-9a-z]+}",
            "/users/admin",
            "/users/admin/{\\[0-9a-z]+}",
            "/tags/admin"
    };

    public static final String[] EMPLOYEE_URLS = {"/application/{\\[0-9a-z]+}"};
}

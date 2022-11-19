package com.mzdyrski.itjobboard.constants;

public class SecurityConstants {
    public static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000;
    public static final String TOKEN_HEADER = "Bearer ";
    public static final String JWT_TOKEN_HEADER = "Jwt-Token";
    public static final String AUTHORITIES = "authorities";
    public static final String OPTIONS_HTTP_METHOD = "OPTIONS";
    public static final String PORTAL_NAME = "ItJobBoard";
    public static final String[] PUBLIC_URLS = {
            "/user/register",
            "/user/register/confirm",
            "/user/login",
            "/offers",
            "/offers/{\\[0-9a-z]+}",
            "/offers/tags/**",
            "/offers/tags"
    };
    public static final String[] EMPLOYER_URLS = {"/offers/add"};
    public static final String[] ADMIN_URLS = {
            "/offers/admin",
            "/offers/admin/{\\[0-9a-z]+}",
            "/user/admin",
            "/user/admin/{\\[0-9a-z]+}"
    };

    public static final String[] EMPLOYEE_URLS = {"/offers/{\\[0-9a-z]+}/application"};
}

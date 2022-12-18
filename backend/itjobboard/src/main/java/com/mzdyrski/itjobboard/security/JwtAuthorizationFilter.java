package com.mzdyrski.itjobboard.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.mongodb.lang.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.mzdyrski.itjobboard.constants.SecurityConstants.OPTIONS_HTTP_METHOD;
import static com.mzdyrski.itjobboard.constants.SecurityConstants.TOKEN_HEADER;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JWTTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            if (request.getMethod().equalsIgnoreCase(OPTIONS_HTTP_METHOD)) {
                response.setStatus(OK.value());
            } else {
                var authorizationHeader = request.getHeader(AUTHORIZATION);
                if (authorizationHeader == null || !authorizationHeader.startsWith(TOKEN_HEADER)) {
                    filterChain.doFilter(request, response);
                    return;
                }
                var token = authorizationHeader.substring(TOKEN_HEADER.length());
                var username = jwtTokenProvider.getSubject(token);
                if (jwtTokenProvider.isTokenValid(username, token) && SecurityContextHolder.getContext().getAuthentication() == null) {
                    var authorities = jwtTokenProvider.getAuthorities(token);
                    var authentication = jwtTokenProvider.getAuthentication(username, authorities, request);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    SecurityContextHolder.clearContext();
                }
            }

            filterChain.doFilter(request, response);
        } catch (JWTVerificationException e){
            response.setStatus(UNAUTHORIZED.value());
        }
    }
}

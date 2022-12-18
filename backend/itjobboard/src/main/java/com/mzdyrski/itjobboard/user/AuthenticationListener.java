package com.mzdyrski.itjobboard.user;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AuthenticationListener {

    private final LoginAttemptService loginAttemptService;

    @EventListener
    public void onFailure(AbstractAuthenticationFailureEvent event) {
        var email = event.getAuthentication().getPrincipal();
        if (email instanceof String) {
            email = event.getAuthentication().getPrincipal();
            loginAttemptService.addUserToLoginCache((String) email);
        }
    }

    @EventListener
    public void onSuccess(AuthenticationSuccessEvent event) {
        var userSecurity = event.getAuthentication().getPrincipal();
        if (userSecurity instanceof UserSecurity) {
            var user = (UserSecurity) event.getAuthentication().getPrincipal();
            loginAttemptService.evictUserFromCache(user.getUsername());
        }
    }
}

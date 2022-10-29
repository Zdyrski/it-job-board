package com.mzdyrski.itjobboard.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

import static java.util.concurrent.TimeUnit.MINUTES;

@Service
public class LoginAttemptService {
    private static final int MAX_NUMBER_OF_ATTEMPTS = 5;
    private static final int ATTEMPT_INCREMENT = 1;
    private static final int CACHE_MAX_SIZE = 1000;
    private final LoadingCache<String, Integer> loggingAttemptCache;

    public LoginAttemptService() {
        super();
        loggingAttemptCache = CacheBuilder.newBuilder().expireAfterWrite(15, MINUTES).maximumSize(CACHE_MAX_SIZE).build(new CacheLoader<>() {
            @Override
            public Integer load(String key) {
                return 0;
            }
        });
    }

    public void evictUserFromCache(String email) {
        loggingAttemptCache.invalidate(email);
    }

    public void addUserToLoginCache(String email) {
        int attempts;
        try {
            attempts = ATTEMPT_INCREMENT + loggingAttemptCache.get(email);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
        loggingAttemptCache.put(email, attempts);
    }

    public boolean hasExceededMaxAttempts(String email) {
        try {
            return loggingAttemptCache.get(email) >= MAX_NUMBER_OF_ATTEMPTS;
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}

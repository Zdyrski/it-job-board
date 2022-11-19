package com.mzdyrski.itjobboard.domain;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ConfirmationTokenRepository extends MongoRepository<ConfirmationToken, String> {

    Optional<ConfirmationToken> findConfirmationTokenByToken(String token);
}

package com.mzdyrski.itjobboard.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ConfirmationTokenRepository extends MongoRepository<ConfirmationToken, String> {

    Optional<ConfirmationToken> findConfirmationTokenByToken(String token);
}

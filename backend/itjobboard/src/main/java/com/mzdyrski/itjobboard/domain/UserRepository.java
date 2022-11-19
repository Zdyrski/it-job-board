package com.mzdyrski.itjobboard.domain;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    User findUserByEmail(String email);
}

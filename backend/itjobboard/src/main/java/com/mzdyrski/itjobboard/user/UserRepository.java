package com.mzdyrski.itjobboard.user;

import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    User findUserByEmail(String email);

    @Override
    <S extends User> Optional<S> findOne(Example<S> example);
}

package com.mzdyrski.itjobboard.domain;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TagRepository extends MongoRepository<User, Long> {
}

package com.mzdyrski.itjobboard.domain;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployerRepository extends MongoRepository<User, Long> {
}

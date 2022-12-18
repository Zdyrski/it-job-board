package com.mzdyrski.itjobboard.domain;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployeesCvRepository extends MongoRepository<EmployeesCv, String> {
    EmployeesCv findFirstByEmployeeId(String employeeId);
}

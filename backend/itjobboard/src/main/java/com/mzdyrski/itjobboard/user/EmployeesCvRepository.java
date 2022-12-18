package com.mzdyrski.itjobboard.user;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployeesCvRepository extends MongoRepository<EmployeesCv, String> {
    EmployeesCv findFirstByEmployeeId(String employeeId);
}

package com.mzdyrski.itjobboard.application;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ApplicationRepository extends MongoRepository<Application, String> {
    List<Application> findApplicationsByUserId(String userId);
    Application findApplicationByOfferIdAndUserId(String offerId, String userId);
}

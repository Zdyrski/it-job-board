package com.mzdyrski.itjobboard.domain;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OfferRepository extends MongoRepository<Offer, String> {
    List<Offer> findAllByEmployerId(String employerId);
}

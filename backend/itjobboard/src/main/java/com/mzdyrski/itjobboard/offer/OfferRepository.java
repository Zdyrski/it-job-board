package com.mzdyrski.itjobboard.offer;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OfferRepository extends MongoRepository<Offer, String> {
    List<Offer> findAllByEmployerIdOrderByDateDesc(String employerId);

    List<Offer> findAllByOrderByDateDesc();
}
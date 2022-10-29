package com.mzdyrski.itjobboard.service;

import com.mzdyrski.itjobboard.domain.Offer;
import com.mzdyrski.itjobboard.domain.ApplicationRepository;
import com.mzdyrski.itjobboard.domain.OfferRepository;
import com.mzdyrski.itjobboard.domain.TagRepository;
import com.mzdyrski.itjobboard.dataTemplates.OfferData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class OfferService {
    //TODO
    final private OfferRepository offerRepository;
    final private ApplicationRepository applicationRepository;
    final private TagRepository tagRepository;

    public OfferData getOfferDetails(String offerId){
        //get offer by id
        return new OfferData();
    }

    public List<Offer> getOffersByFilters(){
        //get list of offers(with using filters)
        return Collections.emptyList();
    }

    public List<Offer> getOffersByUserId(String userId){
        //get my offers(employer - posted, employee - applied)
        return Collections.emptyList();
    }

    public void addOffer(OfferData offerData){
        //validate token
        //validate data
        //add offer to db
        //return response
    }

    public void applyForOffer(String offerId){
        //validate token
        //apply if not applied already
        //add entry in db (userid, offerid)
        //return response
    }
}

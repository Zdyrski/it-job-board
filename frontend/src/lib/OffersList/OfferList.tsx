import React from 'react';
import { OffersListInterface, OfferInterface } from '../../types';
import Offer from './Offer';
import { ListContainer } from './Offer.styled';

function OfferList({ data } : OffersListInterface) {
  return (
    <ListContainer>
      {data.map((offer : OfferInterface) => (
        <Offer
          key={offer.id}
          companyInfo={offer.companyInfo}
          offerName={offer.offerName}
          salary={offer.salary}
          tagline={offer.tagline}
          id={offer.id}
        />
      ))}
    </ListContainer>
  );
}

export default OfferList;

import React from 'react';
import { OffersListInterface, OfferInterface } from '../../types';
import Offer from './Offer';
import { ListContainer } from './Offer.styled';

function OfferList({ data } : OffersListInterface) {
  return (
    <ListContainer>
      {data.map((offer : OfferInterface) => (
        <Offer
          key={offer.offerId}
          title={offer.title}
          companyLogoUrl={offer.companyLogoUrl}
          companyName={offer.companyName}
          city={offer.city}
          remote={offer.remote}
          salary={offer.salary}
          tags={offer.tags}
          offerId={offer.offerId}
          date={offer.date}
        />
      ))}
    </ListContainer>
  );
}

export default OfferList;

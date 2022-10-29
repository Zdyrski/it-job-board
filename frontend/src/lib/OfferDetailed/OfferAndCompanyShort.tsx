import React from 'react';
import OfferLogo from '../CompanyLogo/OfferLogo';
import MoneyRange from '../MoneyRange/MoneyRange';
import LocationAndRemoteTags from '../OfferTagline/LocationAndRemoteTags';
import OfferTagline2 from '../OfferTagline/OfferTagline2';
import { DetailsContainer, LogoAndDetailsContainer, MainContainer } from './OfferAndCompanyShort.styled';

function OfferAndCompanyShort() {
  return (
    <MainContainer>
      <LogoAndDetailsContainer>
        <OfferLogo logoSrc="https://seekvectorlogo.com/wp-content/uploads/2019/06/infobip-vector-logo.png" name="Infobip" />
        <DetailsContainer>
          Java Junior Developer
          <LocationAndRemoteTags location="location" remote="remote" />
          <MoneyRange min={1000} max={2000} currency="PLN" />
        </DetailsContainer>
      </LogoAndDetailsContainer>
      <OfferTagline2 />
    </MainContainer>
  );
}

export default OfferAndCompanyShort;

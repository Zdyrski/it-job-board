import React from 'react';
import { OfferAndCompanyShortInterface } from '../../utils/types';
import OfferLogo from '../CompanyLogo/OfferLogo';
import Contracts from '../Contracts/Contracts';
import LocationAndRemoteTags from '../OfferTagline/LocationAndRemoteTags';
import OfferTagline2 from '../OfferTagline/OfferTagline2';
import {
  DetailsContainer, LogoAndDetailsContainer, MainContainer, Title,
} from './OfferAndCompanyShort.styled';

function OfferAndCompanyShort({
  title,
  companyName,
  companySize,
  companyLogoUrl,
  companySiteUrl,
  experienceLevel,
  addressData,
  remoteStatus,
  contracts,
  date,
} : OfferAndCompanyShortInterface) {
  return (
    <MainContainer>
      <LogoAndDetailsContainer>
        <OfferLogo logoSrc={companyLogoUrl} />
        <DetailsContainer>
          <Title>{title}</Title>
          {companySiteUrl}
          <LocationAndRemoteTags addressData={addressData} remoteStatus={remoteStatus} />
          <Contracts data={contracts} />
        </DetailsContainer>
      </LogoAndDetailsContainer>
      <OfferTagline2
        companyName={companyName}
        companySize={companySize}
        experienceLevel={experienceLevel}
        date={date}
      />
    </MainContainer>
  );
}

export default OfferAndCompanyShort;

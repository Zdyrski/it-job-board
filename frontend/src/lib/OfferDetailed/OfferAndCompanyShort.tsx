import React from 'react';
import { ContractInterface } from '../../types';
import OfferLogo from '../CompanyLogo/OfferLogo';
import Contracts from '../Contracts/Contracts';
import LocationAndRemoteTags from '../OfferTagline/LocationAndRemoteTags';
import OfferTagline2 from '../OfferTagline/OfferTagline2';
import {
  DetailsContainer, LogoAndDetailsContainer, MainContainer, Title,
} from './OfferAndCompanyShort.styled';

interface OfferAndCompanyShortInterface {
  title: string
  companyName: string
  companySize: number
  companyLogoUrl: string
  companySiteUrl: string
  experienceLevel: string
  city: string
  remote: string
  contracts: ContractInterface[]
  date: string
}

function OfferAndCompanyShort({
  title,
  companyName,
  companySize,
  companyLogoUrl,
  companySiteUrl,
  experienceLevel,
  city,
  remote,
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
          <LocationAndRemoteTags location={city} remote={remote} />
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

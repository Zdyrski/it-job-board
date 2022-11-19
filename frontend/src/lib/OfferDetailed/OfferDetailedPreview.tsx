import React, { useContext, useState } from 'react';
import OfferDataContext from '../../contexts/OfferDataContext';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import OfferAndCompanyShort from './OfferAndCompanyShort';
import OfferDescription from './OfferDescription';
import { ListContainer, MainContainer } from './OfferDetailed.styled';
import TechStack from './TechStack';

const inititalData = {
  title: '',
  companyName: '',
  companySize: 0,
  companyLogoUrl: '',
  companySiteUrl: '',
  experienceLevel: '',
  city: '',
  remote: '',
  contracts: [],
  techStack: [],
  description: '',
  date: '',
};

function OfferDetailedPreview() {
  const [data] = useState(inititalData);
  const dd = useContext(OfferDataContext);

  return (
    <MainContainer>
      <ListContainer>
        <OfferAndCompanyShort
          title={dd.toString()}
          companyName={data.companyName}
          companySize={data.companySize}
          companyLogoUrl={data.companyLogoUrl}
          companySiteUrl={data.companySiteUrl}
          experienceLevel={data.experienceLevel}
          city={data.city}
          remote={data.remote}
          contracts={data.contracts}
          date={data.date}
        />
        <TechStack data={data.techStack} />
        <OfferDescription data={data.description} />
        <GlitchedButton placeholder="Apply" />
      </ListContainer>
    </MainContainer>
  );
}

export default OfferDetailedPreview;

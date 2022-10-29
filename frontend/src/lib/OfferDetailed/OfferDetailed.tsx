import React from 'react';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import OfferAndCompanyShort from './OfferAndCompanyShort';
import OfferDescription from './OfferDescription';
import { ListContainer, MainContainer } from './OfferDetailed.styled';
import TechStack from './TechStack';

function OfferDetailed() {
  return (
    <MainContainer>
      <ListContainer>
        <OfferAndCompanyShort />
        <TechStack />
        <OfferDescription />
        <GlitchedButton placeholder="Apply" />
      </ListContainer>
    </MainContainer>
  );
}

export default OfferDetailed;

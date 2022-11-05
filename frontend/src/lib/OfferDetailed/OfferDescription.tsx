import React from 'react';
import parse from 'html-react-parser';
import { MainContainer, Title, ParserContainer } from './OfferDescription.styled';

interface OfferDescriptionInterface {
  data: string
}

function OfferDescription({ data } : OfferDescriptionInterface) {
  return (
    <MainContainer>
      <Title>Offer description</Title>
      <ParserContainer>
        {parse(data)}
      </ParserContainer>
    </MainContainer>
  );
}

export default OfferDescription;

import React from 'react';
import parse from 'html-react-parser';
import { MainContainer, Title, ParserContainer } from './OfferDescription.styled';

function OfferDescription() {
  return (
    <MainContainer>
      <Title>Offer description</Title>
      <ParserContainer>
        {parse('<p><strong>asdasd</strong></p><ul><li>asdasd</li><li>gg</li><li>ff</li></ul>')}
      </ParserContainer>
    </MainContainer>
  );
}

export default OfferDescription;

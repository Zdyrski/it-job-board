import { useNavigate } from 'react-router-dom';
import ListLogo from '../CompanyLogo/ListLogo';
import MoneyRange from '../MoneyRange/MoneyRange';
import OfferTagline from '../OfferTagline/OfferTagline';
import {
  MainContainer, OfferDetails, FirstRow, Name, SecondRow, ThirdRow, DateTag,
} from './Offer.styled';

import { OfferInterface } from '../../types';

function Offer({
  companyInfo, offerName, salary, tagline, id,
} : OfferInterface) {
  const navigate = useNavigate();

  return (
    <MainContainer onClick={() => navigate(`/offers/${id}`)}>
      <ListLogo name={companyInfo.name} logoSrc={companyInfo.logoSrc} />
      <OfferDetails>
        <FirstRow>
          <Name>{offerName}</Name>
          <DateTag>7d ago</DateTag>
        </FirstRow>
        <SecondRow>
          <MoneyRange
            min={salary.min}
            max={salary.max}
            currency={salary.currency}
          />
        </SecondRow>
        <ThirdRow>
          <OfferTagline
            companyName={companyInfo.name}
            location={tagline.location}
            remote={tagline.remote}
            mainTags={tagline.mainTags}
          />
        </ThirdRow>
      </OfferDetails>
    </MainContainer>
  );
}

export default Offer;

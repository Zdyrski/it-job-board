import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import ListLogo from '../CompanyLogo/ListLogo';
import OfferTagline from '../OfferTagline/OfferTagline';
import {
  MainContainer, OfferDetails, FirstRow, Name, SecondRow, ThirdRow, DateTag,
} from './Offer.styled';

import { OfferInterface } from '../../types';

function Offer({
  offerId,
  city,
  companyLogoUrl,
  companyName,
  // eslint-disable-next-line no-unused-vars
  date,
  remote,
  salary,
  tags,
  title,
} : OfferInterface) {
  const navigate = useNavigate();

  return (
    <MainContainer onClick={() => navigate(`/offers/${offerId}`)}>
      <ListLogo logoSrc={companyLogoUrl} />
      <OfferDetails>
        <FirstRow>
          <Name>{title}</Name>
          <DateTag>{moment(new Date(date)).fromNow()}</DateTag>
        </FirstRow>
        <SecondRow>
          {salary}
        </SecondRow>
        <ThirdRow>
          <OfferTagline
            companyName={companyName}
            location={city}
            remote={remote}
            mainTags={tags}
          />
        </ThirdRow>
      </OfferDetails>
    </MainContainer>
  );
}

export default Offer;

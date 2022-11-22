import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AlertColor } from '@mui/material';
import ListLogo from '../CompanyLogo/ListLogo';
import OfferTagline from '../OfferTagline/OfferTagline';
import {
  MainContainer, OfferDetails, FirstRow, Name, SecondRow, ThirdRow, DateTag, RowFlex, StyledAlert,
} from './Offer.styled';

import { OfferInterface } from '../../utils/types';

function Offer({
  offerId,
  addressData,
  companyLogoUrl,
  companyName,
  date,
  remoteStatus,
  salary,
  tags,
  title,
  approvalStatus,
  archived,
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
            addressData={addressData}
            remoteStatus={remoteStatus}
            mainTags={tags}
          />
        </ThirdRow>
        {(approvalStatus !== undefined && archived !== undefined)
        && (
        <RowFlex>
          <StyledAlert
            variant="outlined"
            severity={{ 0: 'error' as AlertColor, 1: 'info' as AlertColor, 2: 'success' as AlertColor }[approvalStatus]}
          >
            {{ 0: 'Disapproved', 1: 'Not approved', 2: 'Approved' }[approvalStatus]}
          </StyledAlert>
          <StyledAlert variant="outlined" severity={archived ? 'error' : 'success'}>{archived ? 'Archived' : 'Not archived'}</StyledAlert>
        </RowFlex>
        )}
      </OfferDetails>
    </MainContainer>
  );
}

export default Offer;

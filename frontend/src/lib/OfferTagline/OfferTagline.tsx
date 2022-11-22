import { styled } from '../stitches.config';

import Tags from '../Tags/Tags';
import {
  MainContainer, CompanyTags, SubContainer,
} from './OfferTagline.styled';
import { OfferTaglineInterface } from '../../utils/types';
import { ReactComponent as Company } from '../../assets/company.svg';
import LocationAndRemoteTags from './LocationAndRemoteTags';

const CompanyT = styled(Company, {
  width: '50%',
  minWidth: '30%',
  height: '50%',
});

function OfferTagline({
  companyName, addressData, remoteStatus, mainTags,
} : OfferTaglineInterface) {
  return (
    <MainContainer>
      <CompanyTags>
        <SubContainer>
          <CompanyT />
          {companyName}
        </SubContainer>
        <LocationAndRemoteTags addressData={addressData} shortAddress remoteStatus={remoteStatus} />
      </CompanyTags>
      <Tags tagsArray={mainTags} />
    </MainContainer>
  );
}

export default OfferTagline;

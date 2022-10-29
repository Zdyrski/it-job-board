import { styled } from '../stitches.config';

import Tags from '../Tags/Tags';
import {
  MainContainer, CompanyTags, SubContainer,
} from './OfferTagline.styled';
import { OfferTaglineInterface } from '../../types';
import { ReactComponent as Company } from '../../assets/company.svg';
import LocationAndRemoteTags from './LocationAndRemoteTags';

const CompanyT = styled(Company, {
  width: '50%',
  minWidth: '30%',
  height: '50%',
});

function OfferTagline({
  companyName, location, remote, mainTags,
} : OfferTaglineInterface) {
  return (
    <MainContainer>
      <CompanyTags>
        <SubContainer>
          <CompanyT />
          {companyName}
        </SubContainer>
        <LocationAndRemoteTags location={location} remote={remote} />
      </CompanyTags>
      <Tags tagsArray={mainTags} />
    </MainContainer>
  );
}

export default OfferTagline;

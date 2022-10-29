import {
  ListImg2, MainContainer2,
} from './ListLogo.styled';
import { CompanyInterface } from '../../types';

function OfferLogo({ name, logoSrc } : CompanyInterface) {
  return (
    <MainContainer2>
      <ListImg2 src={logoSrc} alt={name} />
    </MainContainer2>
  );
}

export default OfferLogo;

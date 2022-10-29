import { MainContainer, ListImg } from './ListLogo.styled';
import { CompanyInterface } from '../../types';

function ListLogo({ name, logoSrc } : CompanyInterface) {
  return (
    <MainContainer>
      <ListImg src={logoSrc} alt={name} />
    </MainContainer>
  );
}

export default ListLogo;

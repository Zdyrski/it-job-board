import { useState } from 'react';
import { MainContainer, ListImg } from './ListLogo.styled';
import { CompanyInterface } from '../../types';
import logo from './ITJOBBOARD_LOGO.jpg';

function ListLogo({ logoSrc } : CompanyInterface) {
  const [src, setSrc] = useState(logoSrc);

  const replaceSrc = () => {
    setSrc(logo);
  };
  return (
    <MainContainer>
      <ListImg
        src={src || logo}
        onError={replaceSrc}
      />
    </MainContainer>
  );
}

export default ListLogo;

import { useState } from 'react';
import { ListImg2, MainContainer2 } from './ListLogo.styled';
import { CompanyInterface } from '../../utils/types';
import logo from './ITJOBBOARD_LOGO.jpg';

function OfferLogo({ logoSrc } : CompanyInterface) {
  const [src, setSrc] = useState(logoSrc);

  const replaceSrc = () => {
    setSrc(logo);
  };
  return (
    <MainContainer2>
      <ListImg2
        src={src || logo}
        onError={replaceSrc}
      />
    </MainContainer2>
  );
}

export default OfferLogo;

import { Tooltip } from '@mui/material';
import { MainContainer3, ListImg3 } from './ListLogo.styled';
import logo from './ITJOBBOARD_LOGO.jpg';

interface UpdateableLogoInterface {
    src: string
    setSrc: React.Dispatch<React.SetStateAction<string>>
}

function UpdateableLogo({ src, setSrc } : UpdateableLogoInterface) {
  const replaceSrc = () => {
    setSrc(logo);
  };
  return (
    <MainContainer3>
      <Tooltip title="Your logo will be adjusted to 1:1 ratio. To change it later contact our Team. Inapropirate logo will result in ban.">
        <ListImg3
          src={src || logo}
          onError={replaceSrc}
        />
      </Tooltip>
    </MainContainer3>
  );
}

export default UpdateableLogo;

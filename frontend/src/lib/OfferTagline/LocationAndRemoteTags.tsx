import { styled } from '../stitches.config';
import { ReactComponent as Location } from '../../assets/location.svg';
import { CompanyTags, SubContainer, RemoteTag } from './OfferTagline.styled';

const LocationT = styled(Location, {
  stroke: '$secondaryColor',
  width: '50%',
  minWidth: '30%',
  height: '50%',
});

interface Props {
    location: string
    remote : string
}

function LocationAndRemoteTags({ location, remote } : Props) {
  return (
    <CompanyTags>
      <SubContainer>
        <LocationT />
        {location}
      </SubContainer>
      {remote && (
      <RemoteTag>
        {remote}
        {' '}
        remote
      </RemoteTag>
      )}
    </CompanyTags>
  );
}

export default LocationAndRemoteTags;

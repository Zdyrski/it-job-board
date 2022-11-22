import { styled } from '../stitches.config';
import { ReactComponent as Location } from '../../assets/location.svg';
import {
  CompanyTags2, SubContainer, RemoteTag, BlockLocation,
} from './OfferTagline.styled';
import { AddressDataInterface } from '../../utils/types';

const LocationT = styled(Location, {
  stroke: '$secondaryColor',
  width: '50%',
  minWidth: '30%',
  height: '50%',
});

interface Props {
    addressData: AddressDataInterface
    shortAddress?: boolean
    remoteStatus : string
}

function LocationAndRemoteTags({ addressData, shortAddress, remoteStatus } : Props) {
  return (
    <CompanyTags2>
      <SubContainer>
        <LocationT />
        <BlockLocation>
          {shortAddress ? addressData.city : `${addressData.country}, ${addressData.city}, ${addressData.street}`}
        </BlockLocation>
      </SubContainer>
      {{
        NO: <div />,
        PARTIAL: <RemoteTag>Partially remote</RemoteTag>,
        FULL_TIME: <RemoteTag>Full time remote</RemoteTag>,
      }[remoteStatus]}
    </CompanyTags2>
  );
}

LocationAndRemoteTags.defaultProps = {
  shortAddress: false,
};

export default LocationAndRemoteTags;

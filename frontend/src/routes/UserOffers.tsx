import Navbar from '../lib/Navbar/Navbar';
import OfferList from '../lib/OffersList/OfferList';
import SAMPLE_DATA from '../assets/TestOfferList';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';

function UserOffers() {
  return (
    <FlexColumnCenterContainer>
      <Navbar filterBar={false} />
      <OfferList data={SAMPLE_DATA} />
    </FlexColumnCenterContainer>
  );
}

export default UserOffers;

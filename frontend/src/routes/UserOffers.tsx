import Navbar from '../lib/Navbar/Navbar';
import OfferList from '../lib/OffersList/OfferList';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';

const OFFERS_URL = 'http://localhost:8080/offers/my-offers';

function UserOffers() {
  return (
    <FlexColumnCenterContainer>
      <Navbar filterBar={false} />
      <OfferList link={OFFERS_URL} />
    </FlexColumnCenterContainer>
  );
}

export default UserOffers;

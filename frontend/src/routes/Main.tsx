import Navbar from '../lib/Navbar/Navbar';
import OfferList from '../lib/OffersList/OfferList';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';

const OFFERS_URL = 'http://localhost:8080/offers';

function Main() {
  return (
    <FlexColumnCenterContainer>
      <Navbar />
      <OfferList link={OFFERS_URL} />
    </FlexColumnCenterContainer>
  );
}

export default Main;

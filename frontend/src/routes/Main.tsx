import Navbar from '../lib/Navbar/Navbar';
import OfferList from '../lib/OffersList/OfferList';
import SAMPLE_DATA from '../assets/TestOfferList';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';

function Main() {
  return (
    <FlexColumnCenterContainer>
      <Navbar />
      <OfferList data={SAMPLE_DATA} />
    </FlexColumnCenterContainer>
  );
}

export default Main;

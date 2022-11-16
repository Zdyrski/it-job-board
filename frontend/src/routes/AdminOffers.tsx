import Navbar from '../lib/Navbar/Navbar';
import AdminOfferList from '../lib/OffersList/AdminOfferList';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';

function AdminOffers() {
  return (
    <FlexColumnCenterContainer>
      <Navbar />
      <AdminOfferList />
    </FlexColumnCenterContainer>
  );
}

export default AdminOffers;

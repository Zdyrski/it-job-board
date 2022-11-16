import Navbar from '../lib/Navbar/Navbar';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';
import AdminUsersList from '../lib/AdminUsersList/AdminUsersList';

function AdminUsers() {
  return (
    <FlexColumnCenterContainer>
      <Navbar filterBar={false} />
      <AdminUsersList />
    </FlexColumnCenterContainer>
  );
}

export default AdminUsers;

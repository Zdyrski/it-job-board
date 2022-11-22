import { hasAuthority } from '../../../utils/helperFunctions';
import { Menu, MenuContent, MenuItem } from './DropdownButton.styled';

function LoggedMenuDropdown() {
  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
  };

  const switchLoggedContent = () => {
    if (hasAuthority('user:read')) {
      return (
        <MenuContent>
          <MenuItem href="/account">Account</MenuItem>
          {hasAuthority('offer:create') && <MenuItem href="/add-offer">Add offer</MenuItem>}
          {hasAuthority('adminPanel:manage') && <MenuItem href="/admin-panel/offers">Manage offers</MenuItem>}
          {hasAuthority('adminPanel:manage') && <MenuItem href="/admin-panel/users">Manage users</MenuItem>}
          <MenuItem href="/my-offers">My offers</MenuItem>
          <MenuItem href="/" onClick={handleLogout}>Logout</MenuItem>
        </MenuContent>
      );
    }
    return (
      <MenuContent>
        <MenuItem href="/sign-in">Sign in</MenuItem>
        <MenuItem href="/sign-up">Sign up</MenuItem>
      </MenuContent>
    );
  };

  return (
    <Menu>
      Menu
      {switchLoggedContent()}
    </Menu>
  );
}

export default LoggedMenuDropdown;

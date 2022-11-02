import React from 'react';
import { Menu, MenuContent, MenuItem } from './DropdownButton.styled';

function LoggedMenuDropdown() {
  const handleLogout = () => {
    sessionStorage.removeItem('jwt-token');
  };

  const switchLoggedContent = () => {
    if (sessionStorage.getItem('jwt-token') !== null) {
      return (
        <MenuContent>
          <MenuItem href="/account">Account</MenuItem>
          <MenuItem href="/add-offer">Add offer</MenuItem>
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

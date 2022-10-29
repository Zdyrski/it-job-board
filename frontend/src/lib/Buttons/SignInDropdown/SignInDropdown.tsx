import React from 'react';
import { Menu, MenuContent, MenuItem } from './SignInDropdown.styled';

function SignInDropdown() {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <Menu>
      Sign in
      <MenuContent>
        <MenuItem href="/account">Account</MenuItem>
        <MenuItem href="/add-offer">Add offer</MenuItem>
        <MenuItem href="/my-offers">My offers</MenuItem>
        <MenuItem href="/" onClick={handleLogout}>Logout</MenuItem>
      </MenuContent>
    </Menu>
  );
}

export default SignInDropdown;

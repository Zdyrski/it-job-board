import React from 'react';
import AccountSettings from '../lib/AccountSettings/AccountSettings';
import Navbar from '../lib/Navbar/Navbar';

function Account() {
  return (
    <div>
      <Navbar filterBar={false} />
      <AccountSettings />
    </div>
  );
}

export default Account;

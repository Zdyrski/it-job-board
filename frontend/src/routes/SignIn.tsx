import React from 'react';
import Navbar from '../lib/Navbar/Navbar';
import SignInForm from '../lib/SignInAndUp/SignInForm';

function SignIn() {
  return (
    <div>
      <Navbar filterBar={false} />
      <SignInForm />
    </div>
  );
}

export default SignIn;

import React from 'react';
import Navbar from '../lib/Navbar/Navbar';
import SignUpForm from '../lib/SignInAndUp/SignUpForm';

function SignUp() {
  return (
    <div>
      <Navbar filterBar={false} />
      <SignUpForm />
    </div>
  );
}

export default SignUp;

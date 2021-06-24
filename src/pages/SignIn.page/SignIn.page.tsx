import React from 'react';
import SignInForm from './components/SignInForm.component';
import Logo from '../../components/appUtils/Logo';

const SignIn = (): JSX.Element => {
  return (
    <div className='form'>
      <Logo />
      <SignInForm />
    </div>
  );
};

export default SignIn;

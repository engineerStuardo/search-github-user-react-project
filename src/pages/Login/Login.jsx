import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

import loginImg from '../../images/login-img.svg';

import { Wrapper } from './styled';

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Wrapper>
      <div className='container'>
        <img src={loginImg} alt='github user' />
        <h1>github user</h1>
        <button className='btn' onClick={loginWithRedirect}>
          login / sign up
        </button>
      </div>
    </Wrapper>
  );
};

export default Login;

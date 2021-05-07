import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Wrapper } from './styled';

const Navbar = () => {
  const { logout, user } = useAuth0();

  return (
    <Wrapper>
      {user.picture && <img src={user.picture} alt={user.name} />}
      {user.name && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        logout
      </button>
    </Wrapper>
  );
};

export default Navbar;

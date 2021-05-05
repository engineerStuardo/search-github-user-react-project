import React from 'react';

import { GithubContext } from '../../../context/context';
import useGlobalContext from '../../CustomHooks/useGlobalContext';

import { Wrapper } from './styled';

const Followers = () => {
  const { followers } = useGlobalContext(GithubContext);

  return (
    <Wrapper>
      <div className='followers'>
        {followers.map(({ avatar_url: img, html_url: url, login }, index) => (
          <article key={index}>
            <img src={img} alt={login} />
            <div>
              <h4>{login}</h4>
              <a href={url}>{url}</a>
            </div>
          </article>
        ))}
      </div>
    </Wrapper>
  );
};

export default Followers;

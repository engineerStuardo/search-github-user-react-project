import React from 'react';
import { MdBusiness, MdLocationOn, MdLink } from 'react-icons/md';

import { useGlobalContext } from '../../../context/context';
import { Wrapper } from './styled';

const Card = () => {
  const { githubUser } = useGlobalContext();
  const {
    avatar_url,
    html_url,
    name,
    company,
    blog,
    bio,
    location,
    twitter_username,
  } = githubUser;

  return (
    <Wrapper>
      <header>
        <img src={avatar_url} alt={name} />
        <div>
          <h4>{name}</h4>
          <p>@{twitter_username || 'john doe'}</p>
        </div>
        <a href={html_url}>follow</a>
      </header>
      <p className='bio'>{bio || 'No info bio'}</p>
      <div className='links'>
        <p>
          <MdBusiness />
          {company || 'No info'}
        </p>
        <p>
          <MdLocationOn />
          {location || 'No info'}
        </p>
        <a href={`https://${blog}`}>
          <MdLink />
          {blog || 'No info'}
        </a>
      </div>
    </Wrapper>
  );
};

export default Card;

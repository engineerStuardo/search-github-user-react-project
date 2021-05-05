import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

import { GithubContext } from '../../context/context';
import useGlobalContext from '../CustomHooks/useGlobalContext';

import { Wrapper, ErrorWrapper } from './styled';

const Search = () => {
  const { request, error, searchGithubUser, loading } = useGlobalContext(
    GithubContext
  );

  const [user, setUser] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (user) {
      searchGithubUser(user);
      setUser('');
    }
  };

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {error.show && (
          <ErrorWrapper>
            <p>{error.msg}</p>
          </ErrorWrapper>
        )}
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <MdSearch />
            <input
              type='text'
              placeholder='enter github user'
              value={user}
              onChange={e => setUser(e.target.value)}
            />
            {request > 0 && !loading && <button type='submit'>search</button>}
          </div>
        </form>
        <h3>request: {request}/60</h3>
      </Wrapper>
    </section>
  );
};

export default Search;

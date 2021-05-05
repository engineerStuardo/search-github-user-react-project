import React, { createContext } from 'react';

import useGithubUser from '../components/CustomHooks/useGithubUser';

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const {
    githubUser,
    repos,
    followers,
    request,
    error,
    searchGithubUser,
    loading,
  } = useGithubUser();

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };

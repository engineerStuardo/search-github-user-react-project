import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  const searchGithubUser = async user => {
    toggleError();
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch(e =>
      console.log(e)
    );

    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      const responseRepos = await axios(
        `${rootUrl}/users/${login}/repos?per_page=100`
      ).catch(e => console.log(e));
      setRepos(responseRepos.data);

      const responseFollowers = await axios(
        `${followers_url}?per_page=100`
      ).catch(e => console.log(e));
      setFollowers(responseFollowers.data);
    } else {
      toggleError(true, 'there is no user with that username');
    }
    setLoading(false);
    checkRequest();
  };

  const toggleError = (show = false, msg = '') => {
    setError({ show, msg });
  };

  const checkRequest = async () => {
    const {
      data: {
        rate: { remaining },
      },
    } = await axios(`${rootUrl}/rate_limit`).catch(e => console.log(e));
    setRequest(remaining);

    if (remaining === 0) {
      toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
    }
  };

  useEffect(() => {
    checkRequest();
  }, []);

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

const useGlobalContext = () => {
  return useContext(GithubContext);
};

export { GithubProvider, useGlobalContext };

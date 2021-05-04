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

    const response = await axios(`${rootUrl}/users/${user}`).catch(e =>
      console.log(e)
    );

    if (response) {
      setGithubUser(response.data);
    } else {
      toggleError(true, 'there is no user with that username');
    }
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
      value={{ githubUser, repos, followers, request, error, searchGithubUser }}
    >
      {children}
    </GithubContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GithubContext);
};

export { GithubProvider, useGlobalContext };

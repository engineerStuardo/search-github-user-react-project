import { useState, useEffect } from 'react';
import axios from 'axios';

import mockUser from '../../context/mockData.js/mockUser';
import mockRepos from '../../context/mockData.js/mockRepos';
import mockFollowers from '../../context/mockData.js/mockFollowers';

const rootUrl = 'https://api.github.com';

const useGithubUser = () => {
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
      fetchRepoAndFollowers(login, followers_url);
    } else {
      toggleError(true, 'there is no user with that username');
    }
    setLoading(false);
    checkRequest();
  };

  const fetchRepoAndFollowers = async (login, followers_url) => {
    const result = await Promise.allSettled([
      axios(`${rootUrl}/users/${login}/repos?per_page=100`),
      axios(`${followers_url}?per_page=100`),
    ]).catch(e => console.log(e));

    const [repos, followers] = result;
    const status = 'fulfilled';

    if (repos.status === status) {
      setRepos(repos.value.data);
    }

    if (followers.status === status) {
      setFollowers(followers.value.data);
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

  return {
    githubUser,
    repos,
    followers,
    request,
    error,
    searchGithubUser,
    loading,
  };
};

export default useGithubUser;

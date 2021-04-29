import React, { useState, useEffect, createContext, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  return (
    <GithubContext.Provider value={'hola'}>{children}</GithubContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GithubContext);
};

export { GithubProvider, useGlobalContext };

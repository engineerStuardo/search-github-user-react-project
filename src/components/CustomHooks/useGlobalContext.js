import { useContext } from 'react';

const useGlobalContext = GithubContext => {
  return useContext(GithubContext);
};

export default useGlobalContext;

/* eslint-disable react/prop-types */

import React, { useMemo } from 'react';
import LoadingPage from '../components/Loading';
import PropTypes from 'prop-types';

const LoadingContext = React.createContext({
  isLoading: false,
  setIsLoading: () => {}
  // handleLoading: TODO
});

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [configLoading, setConfigLoading] = React.useState({});
  const handleLoading = ({ config }) => {
    setConfigLoading({ config });
    setIsLoading(true);
  };
  const value = useMemo(
    () => ({ isLoading, setIsLoading, handleLoading }),
    [isLoading]
  );
  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <LoadingPage {...configLoading} />}
    </LoadingContext.Provider>
  );
};

LoadingProvider.prototype = {
  children: PropTypes.node
};

export { LoadingContext, LoadingProvider };

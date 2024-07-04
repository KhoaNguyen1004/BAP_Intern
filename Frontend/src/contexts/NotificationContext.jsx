/* eslint-disable react/prop-types */

import React, { useMemo } from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';

const NotificationContext = React.createContext({
  openNotification: () => {}
});

const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, message, description) => {
    api.info({
      message,
      description,
      placement
    });
  };

  const value = useMemo(() => ({ openNotification }), [api]);

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node
};

export { NotificationContext, NotificationProvider };

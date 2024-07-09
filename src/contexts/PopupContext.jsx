import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const PopupContext = createContext();

export const usePopup = () => {
  return useContext(PopupContext);
};

export const PopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  const openPopup = content => {
    setContent(content);
    setIsOpen(true);
  };

  const closePopup = () => {
    setContent(null);
    setIsOpen(false);
  };

  return (
    <PopupContext.Provider value={{ isOpen, openPopup, closePopup, content }}>
      {children}
    </PopupContext.Provider>
  );
};

PopupProvider.propTypes = {
  children: PropTypes.node
};

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import setupInterceptors from './services/setupInterceptors';
import { store } from './store/store';

import { LoadingProvider } from './contexts/LoadingContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { PopupProvider } from './contexts/PopupContext';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <NotificationProvider>
        <LoadingProvider>
          <PopupProvider>
            <App />
          </PopupProvider>
        </LoadingProvider>
      </NotificationProvider>
    </BrowserRouter>
  </Provider>
);

setupInterceptors(store);

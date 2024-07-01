import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import setupInterceptors from './services/setupInterceptors';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './index.css';
import { LoadingProvider } from './contexts/LoadingContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </BrowserRouter>
  </Provider>
);

setupInterceptors(store);

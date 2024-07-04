import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import templatesReducer from '../features/dashboard/templatesSlide';
import setupInterceptors from '../services/setupInterceptors';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    templates: templatesReducer
  }
});

setupInterceptors(store);

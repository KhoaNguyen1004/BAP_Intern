import React from 'react';
import { PrivateRoute } from './components/privateRoute';
import { Login } from './features/auth/login';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './features/dashboard/dashboard';
function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div>Content Private</div>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <div>
              Not Found
              <Link to="/login">Login</Link>
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

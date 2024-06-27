import React from 'react';
import { PrivateRoute } from './components/privateRoute';
import { Login } from './features/auth/login';
import { Link, Route, Routes } from 'react-router-dom';
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
      </Routes>
    </div>
  );
}

export default App;

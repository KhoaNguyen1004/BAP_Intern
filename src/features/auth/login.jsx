import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAsync, selectAuth } from './authSlice';
import { LoadingContext } from '../../contexts/LoadingContext';

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector(selectAuth);
  const { setIsLoading } = useContext(LoadingContext);
  const [message, setMessage] = useState('');
  const handleSubmit = async event => {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;

    setIsLoading(true);
    dispatch(loginAsync({ username, password }))
      .unwrap()
      .then(() => {
        navigate('/admin/dashboard');
        localStorage.setItem('username', username);
        window.location.reload();
      })
      .catch(() => {
        setMessage('Login failed');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <main>
        <div>
          <div>Login</div>
          <div>{error}</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button>Log in</button>
            <div>{message}</div>
            <div>
              Don’t have an account yet? <Link to="/register">Sign up</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

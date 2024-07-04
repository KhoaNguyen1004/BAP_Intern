import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAsync, selectAuth } from './authSlice';
import { LoadingContext } from '../../contexts/LoadingContext';
import TokenService from '../../services/token.service';

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isLoggedIn } = useAppSelector(selectAuth);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    console.log('Is logged in first? ', isLoggedIn);
    if (isLoggedIn) {
      navigate('/admin/dashboard');
      console.log('Navigating to admin/dashboard in useEffect');
      console.log('Is logged in second? ', isLoggedIn);
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async event => {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;

    setIsLoading(true);

    dispatch(loginAsync({ username, password }))
      .unwrap()
      .then(response => {
        console.log('Login successful, response:', response);
        TokenService.setUser(response);
        TokenService.getLocalRefreshToken(response.refreshToken);
        navigate('/admin/dashboard');
      })
      .catch(error => {
        console.error('Login error:', error);
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
            <div>
              Don’t have an account yet? <Link to="/register">Sign up</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

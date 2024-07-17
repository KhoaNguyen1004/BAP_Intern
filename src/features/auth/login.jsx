import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAsync, selectAuth } from './authSlice';
import { LoadingContext } from '../../contexts/LoadingContext';
import { NotificationContext } from '../../contexts/NotificationContext';
import TokenService from '../../services/token.service';

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isLoggedIn } = useAppSelector(selectAuth);
  const { setIsLoading } = useContext(LoadingContext);
  const { openNotification } = useContext(NotificationContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const onFinish = async (values) => {
    const { username, password } = values;

    setIsLoading(true);
    setIsSubmitting(true);

    try {
      const response = await dispatch(
        loginAsync({ username, password })
      ).unwrap();
      console.log('Login successful, response:', response.data);
      TokenService.setUser(response.data);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      openNotification({
        message: 'Invalid username or password!',
        type: 'error',
        title: 'Login Failed'
      });
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: 'fit-content',
          marginTop: '10%',
          margin: 'auto',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '10px' }}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '10px' }}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isSubmitting}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}

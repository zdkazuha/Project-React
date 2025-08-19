import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { AccountContext } from '../contexts/account.context';
import { useToast } from '../contexts/toast.context';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const { setEmail } = useContext(AccountContext);
  const navigate = useNavigate();
  const { showToast } = useToast()

  const onFinish = (values) => {
    showToast("You have successfully logged into your account!", "success");
    setEmail(values.username);

    if (values.username === "Admin" && values.password === "Adminpass01")
      showToast("You have logged in as an admin!", "success");

    navigate('/');
  };

  return (

    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <Form
        name="basic"
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please enter your username.!' },
            { min: 3, message: 'The username must be at least 8 characters long!' },
            { max: 20, message: 'The username must be no longer than 20 characters!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter your password.!' },
            { min: 8, message: 'The password must be at least 8 characters long!' },
            { max: 20, message: 'The password must be no longer than 20 characters!' },
            { pattern: /^[A-Z](?=.*\d).+$/, message: 'The password must start with a capital letter and contain at least one digit.' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ div>)
};

export default LoginForm;
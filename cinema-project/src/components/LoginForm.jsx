import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { AccountContext } from '../contexts/account.context';
import { useToast } from '../contexts/toast.context';

const LoginForm = () => {

    const {setEmail} = useContext(AccountContext);
    const {showToast} = useToast()

    const onFinish = (values) => {
        console.log('Success:', values);
        showToast("You have successfully logged into your account!", "success");
        setEmail(values.username);
    };

    return (
        
    <div style={{ textAlign: 'center'}}>
    <h2>Login</h2>
  <Form
    name="basic"
    style={{ maxWidth: 600, margin: 'auto', textAlign: 'center' }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
    layout="vertical"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
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
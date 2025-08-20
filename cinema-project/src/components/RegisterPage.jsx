import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { AccountContext } from '../contexts/account.context';
import { useToast } from '../contexts/toast.context';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const { setEmail } = useContext(AccountContext);
    const navigate = useNavigate();
    const { showToast } = useToast()

    const onFinish = (values) => {

        if (values.passwordFirst !== values.passwordSecond || values.passwordFirst === "Adminpass01" || values.username === "Admin") {
            showToast("The passwords do not match!", "error");
            return;
        }
        showToast("You have successfully registered.", "success");
        setEmail(values.username);

        navigate('/');
    };

    return (

        <div style={{ textAlign: 'center' }}>

            <hr />
            <h1 className='header-text'>Register</h1>
            <hr style={{ marginBottom: 50 }} />
            
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
                    name="passwordFirst"
                    rules={[
                        { required: true, message: 'Please enter your password.!' },
                        { min: 8, message: 'The password must be at least 8 characters long!' },
                        { max: 20, message: 'The password must be no longer than 20 characters!' },
                        { pattern: /^[A-Z](?=.*\d).+$/, message: 'The password must start with a capital letter and contain at least one digit.' },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="passwordSecond"
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

export default RegisterPage;
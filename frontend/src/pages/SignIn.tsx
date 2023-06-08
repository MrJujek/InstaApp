import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import SwitchTheme from "@/components/SwitchTheme";
import { useTheme } from "@/contexts/ThemeContext";

function SignIn() {
  const { Text } = Typography;

  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  const { isDarkTheme } = useTheme();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onFinish = (values: { login: string, password: string }) => {
    console.log('Success:', values);

    signIn(values.login, values.password);
  };

  return (
    <>
      <div className="signIn" style={{ color: isDarkTheme ? "#ffffff" : "#141414" }}>
        <h1>InstaApp</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="login"
            rules={[{ required: true, message: 'Please input your nickname or email!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nickname or email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>

        <div className="signInLink">
          <Text>Don't have an account?</Text>
          <Button type="primary"><Link to="/signup">Sign Up</Link></Button>
        </div>

        <SwitchTheme />
      </div>
    </>
  )
}

export default SignIn
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, message } from 'antd';
import SwitchTheme from "@/components/SwitchTheme";
import { useTheme } from "@/contexts/ThemeContext";

function SignIn() {
  const { Text } = Typography;

  const { signIn, user, registerData, setRegisterData } = useAuth();
  const navigate = useNavigate();

  const { isDarkTheme } = useTheme();

  const [messageApi, contextHolder] = message.useMessage();

  const [inputStatus, setInputStatus] = useState<string | undefined>(undefined);

  const [accountConfirmed, setAccountConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (registerData.data && registerData.data.registered == true) {
      setAccountConfirmed(true);
    }
  }, []);

  useEffect(() => {
    if (accountConfirmed == true) {
      messageApi.open({
        type: 'success',
        content: "Successfully confirmed account!",
      });

      setRegisterData({ status: false, data: { registered: false } })
    }
  }, [accountConfirmed]);

  useEffect(() => {
    if (user && typeof (user) === "object") {
      navigate("/");
    }
  }, [user, navigate]);

  const onFinish = async (values: { login: string, password: string }) => {
    let info = await signIn(values.login, values.password);

    if (info.logged == false) {
      messageApi.open({
        type: 'error',
        content: info.message,
      });

      setInputStatus("error");
    } else if (info.logged == true) {
      messageApi.open({
        type: 'success',
        content: info.message,
      });
    }
  };

  return (
    <>
      {contextHolder}
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
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nickname or email"
              status={inputStatus == "error" ? "error" : undefined}
              onChange={() => { setInputStatus(undefined) }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              status={inputStatus == "error" ? "error" : undefined}
              onChange={() => { setInputStatus(undefined) }}
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
          <Link to="/signup"><Button type="primary">Sign Up</Button></Link>
        </div>

        <SwitchTheme />
      </div>
    </>
  )
}

export default SignIn
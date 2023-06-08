import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import SwitchTheme from "@/components/SwitchTheme";
import { useTheme } from "@/contexts/ThemeContext";

function SignUp() {
    const [showConfirm, setShowConfirm] = useState(false);

    const { user, registerData, signUp } = useAuth();
    const navigate = useNavigate();

    const { Text } = Typography;

    const { isDarkTheme } = useTheme();

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 16,
                offset: 8
            }
        }
    };

    const [form] = Form.useForm();

    const onFinish = (values: { name: string, lastName: string, email: string, password: string, nickName: string, confirm: string }) => {
        console.log("Received values of form: ", values);

        signUp(values.name, values.lastName, values.email, values.password, values.nickName);
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (registerData.status) {
            console.log("msg", registerData.message);
            setShowConfirm(true);
        }
    }, [registerData]);

    return (
        <>
            <div className="signUp" style={{ color: isDarkTheme ? "#ffffff" : "#141414" }}>
                <h1>InstaApp</h1>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        tooltip="What is your name?"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                                whitespace: true
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Lastname"
                        tooltip="What is your last name?"
                        rules={[
                            {
                                required: true,
                                message: "Please input your last name!",
                                whitespace: true
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="nickName"
                        label="Nickname"
                        tooltip="What do you want others to call you?"
                        rules={[
                            {
                                required: true,
                                message: "Please input your nickname!",
                                whitespace: true
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!"
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!"
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!"
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("The new password that you entered do not match!")
                                    );
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>

                <div className="signUpLink">
                    <Text>Have an account?</Text>
                    <Button type="primary"><Link to="/signin">Sign In</Link></Button>
                </div>

                <SwitchTheme />
            </div>
        </>
    );
}

export default SignUp
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, message } from "antd";
import SwitchTheme from "@/components/SwitchTheme";
import { useTheme } from "@/contexts/ThemeContext";
import ConfirmAccountModal from "@/components/ConfirmAccountModal"

function SignUp() {
    const { isDarkTheme } = useTheme();
    const { user, registerData, signUp } = useAuth();

    const navigate = useNavigate();
    const { Text } = Typography;
    const [messageApi, contextHolder] = message.useMessage();

    const [showConfirm, setShowConfirm] = useState(false);
    const [emailInputStatus, setEmailInputStatus] = useState<string | undefined>(undefined);
    const [nicknameInputStatus, setNicknameInputStatus] = useState<string | undefined>(undefined);

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 7 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 16,
                offset: 4
            },
            sm: {
                span: 16,
                offset: 7
            }
        }
    };

    const [form] = Form.useForm();

    const onFinish = (values: { name: string, lastName: string, email: string, password: string, nickName: string, confirm: string }) => {
        signUp(values.name, values.lastName, values.email, values.password, values.nickName);
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (!registerData.data || !registerData.data.message) {
            return;
        }

        if (registerData.data.registered === true) {
            messageApi.open({
                type: "success",
                content: registerData.data.message
            });

            setShowConfirm(true);
        } else if (registerData.data.registered === false) {
            messageApi.open({
                type: "error",
                content: registerData.data.message
            });

            if (registerData.data.message.includes("email")) {
                setEmailInputStatus("error");
            } else if (registerData.data.message.includes("nickname")) {
                setNicknameInputStatus("error");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerData]);

    return (
        <>
            {contextHolder}
            <div className="signUp" style={{ color: isDarkTheme ? "#ffffff" : "#141414" }}>
                <h1>InstaApp</h1>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    style={{ maxWidth: 550 }}
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
                        <Input
                            status={nicknameInputStatus == "error" ? "error" : undefined}
                            onChange={() => { setNicknameInputStatus(undefined) }}
                        />
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
                        <Input
                            status={emailInputStatus == "error" ? "error" : undefined}
                            onChange={() => { setEmailInputStatus(undefined) }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        dependencies={["confirm"]}
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!"
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("confirm") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("Passwords do not match!")
                                    );
                                }
                            })
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
                                        new Error("Passwords do not match!")
                                    );
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{ width: 210 }}>
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>

                <div className="signUpLink">
                    <Text>Have an account?</Text>
                    <Link to="/signin"><Button type="primary">Sign In</Button></Link>
                </div>

                <SwitchTheme />
            </div>

            {showConfirm && <ConfirmAccountModal />}
        </>
    );
}

export default SignUp
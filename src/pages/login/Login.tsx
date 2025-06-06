import {
  Layout,
  Card,
  Space,
  Form,
  Input,
  Checkbox,
  Button,
  Flex,
  Alert,
} from "antd";
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/Logo";
import { useMutation } from "@tanstack/react-query";
import type { Credentials } from "../../types";
import { login } from "../../http/api";

const loginUser = async (credentials: Credentials) => {
  // server call logic
  const { data } = await login(credentials);
  return data;
};

const LoginPage = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: () => {
      console.log("Login success");
    },
  });

  return (
    <Layout style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <Space direction="vertical" align="center" size="large">
        <Layout.Content
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo />
        </Layout.Content>

        <Card
          variant="borderless"
          style={{ width: 300 }}
          title={
            <Space
              style={{
                width: "100%",
                fontSize: 16,
                justifyContent: "center",
              }}
            >
              <LockFilled />
              Sign in
            </Space>
          }
        >
          <Form
            initialValues={{ remember: true }}
            onFinish={(values) => {
              mutate({ email: values.username, password: values.password });
              console.log(values);
            }}
          >
            {isError && <Alert style={{marginBottom: 24}} type="error" message={error?.message} />}

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your Username",
                },
                {
                  type: "email",
                  message: "Username is not valid",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your Password",
                },
                {
                  min: 8,
                  message: "Password must be minimum of 8 charecters",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Flex justify="space-between" align="baseline">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Flex>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isPending}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Layout>
  );
};

export default LoginPage;

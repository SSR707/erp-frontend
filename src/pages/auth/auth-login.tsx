import { useEffect } from "react";
import SvgRainBackground from "@/components/SvgRainBackground/SvgRainBackground";
import { Form, Input, Button, Col } from "antd";
import type { FormProps } from "antd";
import { useAuthStore } from "@/store/useAtuhStore";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { usePostLogin } from "./service/mutation/usePostLogin";
import { IAuthResponse } from "@/utils";
export type FieldType = {
  login?: string;
  password?: string;
};

const AuthLogin = () => {
  const navigate = useNavigate();
  const { isLogged, logIn } = useAuthStore((state) => state);
  useEffect(() => {
    if (isLogged) {
      navigate("/", { replace: true });
    }
  }, []);
  const { mutate, isPending } = usePostLogin();
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(
      { username: values.login?.trim(), password: values.password?.trim() },
      {
        onSuccess: (data: IAuthResponse) => {
          logIn({ user: data.user, token: data.data.accessToken });
          navigate("/", { replace: true });
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message;
          form.setFields([
            {
              name: "login",
              errors: [errorMessage],
            },
            {
              name: "password",
              errors: [errorMessage],
            },
          ]);
        },
      }
    );
  };
  return (
    <>
      <SvgRainBackground />
      <Col
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 101,
        }}
      >
        <Col
          style={{
            padding: "35px 35px 25px 35px",
            borderRadius: "20px",
            background: "#fff",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            position: "relative",
            zIndex: 102,
          }}
        >
          <Title
            level={2}
            style={{
              fontWeight: 500,
              fontSize: "32px",
              color: "#0e1427",
              marginBottom: "48px",
              textAlign: "center",
              fontFamily: "var(--second-family)",
            }}
          >
            {" "}
            Tizimga kirish
          </Title>
          <Form
            form={form}
            name="basic"
            style={{ width: 450 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              name="login"
              rules={[
                { required: true, message: "Iltimos login ni kiriting !" },
              ]}
            >
              <Input
                style={{
                  padding: "10px 5px",
                  borderBottom: "1px solid var(--breand-rang-1)",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
                variant="underlined"
                placeholder="Login"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Iltimos parol ni kiriting !" },
              ]}
            >
              <Input.Password
                style={{
                  padding: "10px 5px",
                  borderBottom: "1px solid var(--breand-rang-1)",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
                variant="underlined"
                placeholder="Parol"
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                loading={isPending}
                type="primary"
                htmlType="submit"
                style={{
                  fontFamily: "var(--second-family)",
                  padding: "25px 30px",
                  borderRadius: "10px",
                  background: "var(--breand-rang-1)",
                  width: "100%",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "133%",
                  textAlign: "center",
                  color: "var(--oq-rang-1)",
                  marginTop: "20px",
                }}
              >
                Kirish
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Col>
    </>
  );
};

export default AuthLogin;

import {
  Button,
  Col,
  FormProps,
  Row,
  Form,
  Input,
  notification,
  Modal,
} from "antd";
//@ts-ignore
import AddIconSvg from "@/assets/svg/add.icon.svg";
//@ts-ignore
import FileUploadIconSvg from "@/assets/svg/file-upload.icon.svg";
//@ts-ignore
import OkIconSvg from "@/assets/svg/create.ok.icon.svg";
//@ts-ignore
import NoIconSvg from "@/assets/svg/create.no.icon.svg";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { usePostConfirmPassword } from "../service/mutation/usePostConfirmPassword";
import { client } from "@/config/QueryClient";
export type FieldType = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

interface IProp {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ConfirmPassword = ({ isOpen, setIsOpen }: IProp) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { mutate: ConfirmPassword, isPending } = usePostConfirmPassword();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const PasswordData = {
      old_password: values.old_password,
      new_password: values.new_password,
    };
    ConfirmPassword(PasswordData, {
      onSuccess: () => {
        api.success({
          message: "Muvaffaqiyatli ozgardi",
          description: "Parol muvaffaqiyatli ozgardi",
        });
        form.resetFields();
        setIsOpen()
        client.invalidateQueries({ queryKey: ["admin_profile"] });
      },
      onError: (error: any) => {
        if (error.response.status === 400) {
          form.setFields([
            {
              name: "old_password",
              errors: ["Amaldagi  parol noto‘g‘ri!"],
            },
          ]);
        } else if (error.response.status === 422) {
          form.setFields([
            {
              name: "password",
              errors: [
                "Parol 8+ belgi, 1 katta, 1 kichik harf, 1 raqam va 1 maxsus belgidan iborat bo‘lishi kerak.",
              ],
            },
          ]);
        } else {
          api.error({
            message: "Error",
            description: `${error}`,
          });
        }
      },
    });
  };
  const validateConfirmPassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject("Yangi parolni tasdiqlang");
    }
    if (value !== form.getFieldValue("new_password")) {
      return Promise.reject("Parollar mos kelmadi");
    }
    return Promise.resolve();
  };

  return (
    <>
      {contextHolder}{" "}
      <Modal
        centered
        closable={false}
        open={isOpen}
        footer={[
          <Row style={{ width: "full", justifyContent: "center" }}>
            <Button
              key="cancel"
              onClick={() => setIsOpen()}
              style={{
                backgroundColor: "var(--qidiruv-tizimi-1)",
                color: "#000",
                margin: "0 8px",
                border: "none",
                padding: "20px 30px",
              }}
            >
              Bekor qilish
            </Button>
            <Button
              loading={isPending}
              key="cancel"
              onClick={() => {
                form.submit();
              }}
              style={{
                backgroundColor: "var(--breand-rang-1)",
                color: "#fff",
                margin: "0 8px",
                border: "none",
                padding: "20px 30px",
              }}
            >
              Saqlash
            </Button>
          </Row>,
        ]}
      >
        <Col style={{ padding: "30px 20px" }}>
          <Form
            form={form}
            name="nest-messages"
            layout="vertical"
            className="course-create-form"
            onFinish={onFinish}
            style={{ width: "100%", maxWidth: "full" }}
          >
            <Form.Item
              label={<span className="form_label__title"> Amaldagi parol</span>}
              name="old_password"
              rules={[{ required: true, message: "Eski parolni kiriting" }]}
            >
              <Input.Password
                style={{
                  border: "1px solid var(--qidiruv-tizimi-1)",
                  borderRadius: "4px",
                  background: " transparent",
                  width: "full",
                  height: "45px",
                  fontFamily: "var(--font-family)",
                  fontWeight: "400",
                  fontSize: "16px",
                  color: "var(--matn-rang-1)",
                }}
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined style={{ fontSize: "20px" }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ fontSize: "20px" }} />
                  )
                }
              />
            </Form.Item>
            <Form.Item
              label={<span className="form_label__title"> Yangi parol</span>}
              name="new_password"
              rules={[{ required: true, message: "Yangi parolni kiriting" }]}
            >
              <Input.Password
                style={{
                  border: "1px solid var(--qidiruv-tizimi-1)",
                  borderRadius: "4px",
                  background: " transparent",
                  width: "full",
                  height: "45px",
                  fontFamily: "var(--font-family)",
                  fontWeight: "400",
                  fontSize: "16px",
                  color: "var(--matn-rang-1)",
                }}
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined style={{ fontSize: "20px" }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ fontSize: "20px" }} />
                  )
                }
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="form_label__title"> Parolni tasdiqlash</span>
              }
              name="confirm_password"
              rules={[
                { required: true },
                { validator: validateConfirmPassword },
              ]}
            >
              <Input.Password
                style={{
                  border: "1px solid var(--qidiruv-tizimi-1)",
                  borderRadius: "4px",
                  background: " transparent",
                  width: "full",
                  height: "45px",
                  fontFamily: "var(--font-family)",
                  fontWeight: "400",
                  fontSize: "16px",
                  color: "var(--matn-rang-1)",
                }}
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined style={{ fontSize: "20px" }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ fontSize: "20px" }} />
                  )
                }
              />
            </Form.Item>
          </Form>
        </Col>
      </Modal>
    </>
  );
};

export default ConfirmPassword;

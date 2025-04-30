import {
  Button,
  Col,
  FormProps,
  Row,
  Form,
  Input,
  notification,
  Select,
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

import { client } from "@/config/QueryClient";
import { usePostCartePaymentTeacher } from "../service/mutation/usePostCartePaymentTeacher";
export type FieldType = {
  paymentType: string;
  sum: number;
};

interface IProp {
  teacher_id: string | undefined;
  isOpen: boolean;
  setIsOpen: () => void;
}

const TeacherPaymentCreate = ({ teacher_id, isOpen, setIsOpen }: IProp) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { mutate: createPayment, isPending } = usePostCartePaymentTeacher();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const PaymentData = {
      teacher_id,
      type: values.paymentType,
      sum: +values.sum,
    };
    createPayment(PaymentData, {
      onSuccess: () => {
        api.success({
          message: `Ajoyib natija`,
          description: "Tolov qilish muvaffaqiyatli bajarildi.",
        });

        setIsOpen();
        form.resetFields();
        client.invalidateQueries({ queryKey: ["teacher", teacher_id] });
      },
      onError: (err: any) => {
        api.error({
          message: `Bekor qilindi!`,
          description: `Tolov qilish  bajarildi. ${err?.response?.data?.message}`,
        });
        setIsOpen();
        form.resetFields();
      },
    });
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
              Tolov qilish
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
            <Col style={{ gap: "25px" }}>
              <Form.Item<FieldType>
                label={<span className="form_label__title">To’lov</span>}
                name="paymentType"
              >
                <Select
                  style={{
                    width: "full",
                    height: "45px",
                    background: "transparent",
                  }}
                >
                  <Select.Option value="CASH">NQAD</Select.Option>
                  <Select.Option value="CREDIT_CARD"> KARTA</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item<FieldType>
                label={<span className="form_label__title">To’lov summa</span>}
                name="sum"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input
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
                />
              </Form.Item>
            </Col>
          </Form>
        </Col>
      </Modal>
    </>
  );
};

export default TeacherPaymentCreate;

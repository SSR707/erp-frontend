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

import LoadingSpinner from "@/components/CustomSpin/spin";
import { client } from "@/config/QueryClient";
import { useGetCourseById } from "../service/query/useGetCourseById";
import { useEffect } from "react";
import { usePatchCourseById } from "../service/mutation/usePatchCourseById";
export type FieldType = {
  name: string;
  duration: string;
};
interface IProp {
  course_id: string | undefined;
  isOpen: boolean;
  setIsOpen: () => void;
}

const CourseEditModal = ({ course_id, isOpen, setIsOpen }: IProp) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { data, isLoading } = useGetCourseById(course_id);
  const { mutate: UpdateCourse, isPending } = usePatchCourseById();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const CourseData = {
      id: course_id,
      name: values.name.trim(),
      duration: +values.duration,
    };
    UpdateCourse(CourseData, {
      onSuccess: () => {
        api.success({
          message: `Ajoyib natija`,
          description:
            "Tizimidagi jadvalni to’ldirish muvaffaqiyatli bajarildi.",
        });
        client.invalidateQueries({ queryKey: ["course", course_id] });
        setIsOpen()
      },
      onError: (err: any) => {
        api.error({
          message: `Bekor qilindi!`,
          description: `Tizimidagi jadvalni to’ldirish muvaffaqiyatsiz bajarildi ${err?.response?.data?.message}`,
        });
      },
    });
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.name,
        duration: data?.duration,
      });
    }
  }, [data, form]);
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
              Sqalash
            </Button>
          </Row>,
        ]}
      >
        {isLoading ? (
          <Row
            style={{
              height: "600px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingSpinner />
          </Row>
        ) : (
          <Col style={{ padding: "30px 20px" }}>
            <Form
              form={form}
              name="nest-messages"
              layout="vertical"
              className="course-create-form"
              onFinish={onFinish}
              style={{ width: "100%", maxWidth: "full" }}
            >
              <Col
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {" "}
                <Form.Item<FieldType>
                  label={<span className="form_label__title">Nomi</span>}
                  name="name"
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
                <Form.Item<FieldType>
                  label={<span className="form_label__title">Davomiligi</span>}
                  name="duration"
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
        )}
      </Modal>
    </>
  );
};

export default CourseEditModal;

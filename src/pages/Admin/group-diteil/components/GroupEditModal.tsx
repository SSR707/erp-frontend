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
  DatePicker,
  Avatar,
} from "antd";
//@ts-ignore
import AddIconSvg from "@/assets/svg/add.icon.svg";
//@ts-ignore
import FileUploadIconSvg from "@/assets/svg/file-upload.icon.svg";
//@ts-ignore
import OkIconSvg from "@/assets/svg/create.ok.icon.svg";
//@ts-ignore
import NoIconSvg from "@/assets/svg/create.no.icon.svg";

import dayjs, { Dayjs } from "dayjs";
import { useGetGroupById } from "../service/query/useGetGroupById";
import { useEffect } from "react";
import { useGetTeachersAll } from "../../teachers/service/query/useGetTeachersAll";
import { useGetCourseAll } from "../../courses/service/query/useGetCoursesAll";
import LoadingSpinner from "@/components/CustomSpin/spin";
import { usePatchGroupById } from "../service/mutation/usePatchGroupById";
import { client } from "@/config/QueryClient";
type FieldType = {
  name: string;
  courseId: string;
  start_date: Dayjs;
  teacherId: string;
};
interface IProp {
  group_id: string | undefined;
  isOpen: boolean;
  setIsOpen: () => void;
}

const GroupEditModal = ({ group_id, isOpen, setIsOpen }: IProp) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { mutate: UpdateGroup, isPending } = usePatchGroupById();
  const { data: CourseData } = useGetCourseAll();
  const { data: TeacherData } = useGetTeachersAll();
  const { data, isLoading } = useGetGroupById(group_id);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const GroupData = {
      id: group_id,
      name: values.name.trim(),
      course_id: values.courseId,
      teacher_id: values.teacherId,
      start_date: values.start_date.format("YYYY-MM-DD"),
    };
    UpdateGroup(GroupData, {
      onSuccess: () => {
        api.success({
          message: `Ajoyib natija`,
          description: "Tahrirlash muvaffaqiyatli bajarildi.",
        });

        setIsOpen();
        form.resetFields();
        client.invalidateQueries({ queryKey: ["group", group_id] });
      },
      onError: (err: any) => {
        api.error({
          message: `Bekor qilindi!`,
          description: `Tahrirlash mofiyaqatsiz bajarildi. ${err?.response?.data?.message}`,
        });
      },
    });
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.data?.name,
        courseId: data.data.course_id,
        start_date: data?.data?.start_date
          ? dayjs(data?.data?.start_date)
          : undefined,
        teacherId: data?.data?.teacher_id,
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
                <Row style={{ gap: "25px" }}>
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
                    <Input className="form_input" />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label={
                      <span className="form_label__title">Boshlangan sana</span>
                    }
                    name="start_date"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <DatePicker className="form_input" />
                  </Form.Item>
                </Row>{" "}
                <Form.Item<FieldType>
                  label={<span className="form_label__title">Course</span>}
                  name="courseId"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Select
                    style={{
                      width: "full",
                      height: "45px",
                      background: "transparent",
                    }}
                  >
                    {CourseData?.data.map((Item, index) => (
                      <Select.Option key={index} value={Item?.course_id}>
                        {Item?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item<FieldType>
                  label={
                    <span className="form_label__title">
                      O'qtuvchi biriktirish
                    </span>
                  }
                  name="teacherId"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Ustoz ismini kiriting"
                    style={{
                      width: "full",
                      height: "45px",
                      background: "transparent",
                    }}
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                      typeof option?.label === "string" &&
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {TeacherData?.data.map((Item) => (
                      <Select.Option
                        key={Item?.user_id}
                        label={Item?.full_name}
                        value={Item?.user_id}
                      >
                        <Row style={{ alignItems: "center", gap: "5px" }}>
                          <Avatar src={Item?.images[0]?.url} />
                          {Item?.full_name}
                        </Row>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Form>
          </Col>
        )}
      </Modal>
    </>
  );
};

export default GroupEditModal;

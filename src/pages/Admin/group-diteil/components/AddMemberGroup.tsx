import {
  Button,
  Col,
  FormProps,
  Row,
  Form,
  notification,
  Select,
  Modal,
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
import { useGetStudentAll } from "../../students/service/query/useGetStudentAll";
import Title from "antd/es/typography/Title";
import { usePostGroupMemberCreate } from "../service/mutation/usePostGroupMemberCreate";
import { client } from "@/config/QueryClient";
import LoadingSpinner from "@/components/CustomSpin/spin";

export type FieldType = {
  student_id: string;
};

interface IProp {
  group_id: string | undefined;
  isOpen: boolean;
  setIsOpen: () => void;
}

const AddMemberGroup = ({ group_id, isOpen, setIsOpen }: IProp) => {
  const [form] = Form.useForm();
  const { data: StudentData, isLoading } = useGetStudentAll();
  const [api, contextHolder] = notification.useNotification();
  const { mutate: CreateMember, isPending } = usePostGroupMemberCreate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const GroupMemberData = {
      groupId: group_id,
      userId: values.student_id,
    };
    CreateMember(GroupMemberData, {
      onSuccess: () => {
        api.success({
          message: `Ajoyib natija`,
          description: "Oquvchi guruhga  muvaffaqiyatli qoshildi.",
        });

        setIsOpen();
        form.resetFields();
        client.invalidateQueries({ queryKey: ["group", group_id] });
      },
      onError: (err: any) => {
        api.error({
          message: `Bekor qilindi!`,
          description: `Oquvchi qoshish muvaffaqiyaqatsiz bajarildi. ${err?.response?.data?.message}`,
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
        title={
          <Row justify={"center"}>
            <Title
              level={2}
              style={{
                fontWeight: 600,
                padding: "5px",
                fontSize: "30px",
                color: "var(--matn-rang-1)",
                fontFamily: "var(--font-family)",
                margin: 0,
              }}
            >
              {" "}
              Oquvchi qoshish
            </Title>
          </Row>
        }
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
              Qoshish
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
          <Col style={{ padding: "25px 20px" }}>
            <Form
              form={form}
              name="nest-messages"
              layout="vertical"
              className="course-create-form"
              onFinish={onFinish}
              style={{ width: "100%", maxWidth: "full" }}
            >
              {" "}
              <Form.Item<FieldType>
                label={
                  <span className="form_label__title">
                    O'qtuvchi biriktirish
                  </span>
                }
                name="student_id"
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
                  {StudentData?.data.map((Item) => (
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
            </Form>
          </Col>
        )}
      </Modal>
    </>
  );
};

export default AddMemberGroup;

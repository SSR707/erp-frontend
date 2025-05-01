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
import LoadingSpinner from "@/components/CustomSpin/spin";
import { useGetAmdinProfile } from "../../layout/service/query/useGetAmdinProfile";
import { useEffect } from "react";
import { usePatchAdminProfile } from "../service/mutation/usePatchAdminProfile";
import { client } from "@/config/QueryClient";
type FieldType = {
  username: string;
  firstname: string;
  lastname: string;
  surname: string;
  gender: string;
  address: string;
  phone_number: string;
  data_of_birth: Dayjs;
};
interface IProp {
  id: string | undefined;
  isOpen: boolean;
  setIsOpen: () => void;
}

const ProfileUpdateModal = ({ id, isOpen, setIsOpen }: IProp) => {
  const { data, isLoading } = useGetAmdinProfile();
  const { mutate: UpdateProfile, isPending } = usePatchAdminProfile();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const ProfileData = {
      id: id,
      full_name: `${values.lastname} ${values.firstname} ${values.surname}`,
      username: values.username,
      gender: values.gender,
      address: values.address.trim(),
      phone_number: values.phone_number,
      data_of_birth: values.data_of_birth.format("YYYY-MM-DD"),
    };
    UpdateProfile(ProfileData, {
      onSuccess: () => {
        api.success({
          message: `Ajoyib natija`,
          description: "Muvaffaqiyatli bajarildi.",
        });
        client.invalidateQueries({ queryKey: ["admin_profile"] });
      },
      onError: (err: any) => {
        api.error({
          message: `Bekor qilindi!`,
          description: `Muvaffaqiyatsiz bajarildi ${err?.response?.data?.message}`,
        });
      },
    });
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        username: data?.data?.username,
        firstname: data?.data?.full_name.split(" ")[1],
        lastname: data?.data?.full_name.split(" ")[0],
        surname:
          data?.data?.full_name.split(" ")[2] +
          " " +
          data?.data?.full_name.split(" ")[3],
        gender: data?.data?.gender,
        address: data?.data?.address,
        phone_number: data?.data?.phone_number,
        data_of_birth: data?.data?.data_of_birth
          ? dayjs(data?.data?.data_of_birth)
          : undefined,
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
                    label={<span className="form_label__title">Login</span>}
                    name="username"
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
                    label={<span className="form_label__title">Ism</span>}
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <Input className="form_input" />
                  </Form.Item>
                </Row>{" "}
                <Row style={{ gap: "25px" }}>
                  <Form.Item<FieldType>
                    label={<span className="form_label__title">Familiya</span>}
                    name="lastname"
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
                    label={<span className="form_label__title">Sharfi</span>}
                    name="surname"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <Input className="form_input" />
                  </Form.Item>
                </Row>{" "}
                <Row style={{ gap: "25px" }}>
                  <Form.Item<FieldType>
                    label={
                      <span className="form_label__title">Tug’ilgan sana</span>
                    }
                    name="data_of_birth"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <DatePicker className="form_input" />
                  </Form.Item>
                  <Form.Item<FieldType>
                    label={<span className="form_label__title">Jinsi</span>}
                    name="gender"
                  >
                    <Select
                      style={{
                        width: "199px",
                        height: "45px",
                        background: "transparent",
                      }}
                    >
                      <Select.Option value="MALE">
                        <span style={{ color: "var(--breand-rang-2)" }}>
                          Og’il bola
                        </span>
                      </Select.Option>
                      <Select.Option value="FEMALE">
                        {" "}
                        <span style={{ color: "var(--qizil-rang-1)" }}>
                          Qiz bola
                        </span>
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Row>{" "}
                <Row style={{ gap: "25px" }}>
                  <Form.Item<FieldType>
                    label={
                      <span className="form_label__title">Yashash manzili</span>
                    }
                    name="address"
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
                      <span className="form_label__title">Tel raqami</span>
                    }
                    name="phone_number"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <Input className="form_input" />
                  </Form.Item>
                </Row>{" "}
              </Col>
            </Form>
          </Col>
        )}
      </Modal>
    </>
  );
};

export default ProfileUpdateModal;

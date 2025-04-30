import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Pagination,
  Row,
  Select,
} from "antd";
import Title from "antd/es/typography/Title";
//@ts-ignore
import AddIconSvg from "@/assets/svg/add.icon.svg";
//@ts-ignore
import FilterSvg from "@/assets/svg/fillter.icon.svg";
//@ts-ignore
import CloseIcon from "@/assets/svg/close.icon.svg";
import { StudentCard } from "./components/StudentCard";
import useGetAllStudent from "./service/query/useGetAllStudentFilter";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import LoadingSpinner from "@/components/CustomSpin/spin";
import { Dayjs } from "dayjs";
import { useGetGroupAll } from "../groups/service/query/useGetGroupAll";
interface FilterType {
  birthDate: Dayjs;
  gender: string;
  groupId: string;
}
interface IFilter {
  data_of_birth?: string;
  gender?: string;
  groupId?: string;
  fullname?: string;
}
const Students = () => {
  const [page, setPage] = useState<number>(1);
  const [isFilterQuery, setFilterQuery] = useState<IFilter | null>(null);
  const { search } = useSearchStore();
  const { data, isLoading } = useGetAllStudent(
    page,
    10,
    isFilterQuery?.data_of_birth,
    isFilterQuery?.gender,
    isFilterQuery?.groupId,
    search
  );
  const [isFilter, setFilter] = useState(false);
  const [form] = Form.useForm();
  const { data: groupData } = useGetGroupAll();
  const onFinish: FormProps<FilterType>["onFinish"] = (values) => {
    setFilterQuery({
      data_of_birth: values.birthDate
        ? values.birthDate.format("YYYY-MM-DD")
        : undefined,
      gender: values.gender ? values.gender : undefined,
      groupId: values.groupId ? values.groupId : undefined,
    });
  };
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <Row
        style={{
          padding: "22px 20px 15px 20px",
          borderBottom: "1px solid var(--qidiruv-tizimi-1)",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <Title
          level={2}
          style={{
            fontWeight: 600,
            fontSize: "26px",
            color: "var(--matn-rang-1)",
            fontFamily: "var(--font-family)",
            margin: 0,
          }}
        >
          {" "}
          O’quvchilar jadvali
        </Title>
        <Row style={{ gap: "15px", alignItems: "center" }}>
          <Button
            onClick={() => navigate("/student/create")}
            style={{
              display: "flex",
              gap: "10px",
              padding: "18px 20px",
              fontFamily: " var(--font-family)",
              fontWeight: 500,
              fontSize: "16px",
              color: "var(--breand-rang-2)",
              border: "1px solid var(--qidiruv-tizimi-1)",
              borderRadius: "4px",
              boxShadow: "2px 2px 2px 0 rgba(0, 0, 0, 0.1)",
              background: "var(--stroka-rang-2)",
            }}
          >
            <img src={AddIconSvg} alt="" />
            Qo’shish
          </Button>
          <Col
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <Button
              onClick={() => (isFilter ? setFilter(false) : setFilter(true))}
              style={{
                padding: "18px 8px",
                border: " 1px solid var(--qidiruv-tizimi-1)",
                borderRadius: "4px",
                boxShadow: "2px 2px 2px 0 rgba(0, 0, 0, 0.1)",
                background: "var(--stroka-rang-2)",
              }}
            >
              <img src={FilterSvg} alt="" />
            </Button>
            {isFilter ? (
              <Row
                style={{
                  position: "absolute",
                  top: "170%",
                  flexDirection: "column",
                  right: 0,
                  width: "190px",
                  border: "1px solid var(--qidiruv-tizimi-1)",
                  borderRadius: "4px",
                  boxShadow: "2px 2px 4px 0 rgba(0, 0, 0, 0.1)",
                  background: "var(--oq-rang-1)",
                  zIndex: 999,
                }}
              >
                <Row
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "2px solid var(--qidiruv-tizimi-1) ",
                    padding: "10px",
                  }}
                >
                  <Title
                    level={2}
                    style={{
                      fontWeight: 600,
                      fontSize: "24px",
                      color: "var(--matn-rang-1)",
                      fontFamily: "var(--font-family)",
                      margin: 0,
                    }}
                  >
                    Filtr
                  </Title>
                  <Col
                    onClick={() => {
                      setFilter(false);
                    }}
                  >
                    <img src={CloseIcon} alt="" />
                  </Col>
                </Row>
                <Col style={{ padding: "10px" }}>
                  {" "}
                  <Form
                    form={form}
                    name="nest-messages"
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ width: "100%", maxWidth: "full" }}
                  >
                    <Form.Item<FilterType> name="birthDate">
                      <DatePicker
                        placeholder="Tug’ilgan sana"
                        className="filter_form__input"
                      />
                    </Form.Item>
                    <Form.Item<FilterType> name="gender">
                      <Select
                        style={{
                          width: "100%",
                          height: "33px",
                          background: "transparent",
                        }}
                        placeholder={
                          <span className="filter_form__span"> Jins</span>
                        }
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
                    <Form.Item<FilterType> name="groupId">
                      <Select
                        placeholder={
                          <span className="filter_form__span"> Guruh</span>
                        }
                        style={{
                          width: "100%",
                          height: "33px",
                          background: "transparent",
                        }}
                        showSearch
                        optionFilterProp="label"
                        filterOption={(input, option) =>
                          typeof option?.label === "string" &&
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      >
                        {groupData?.data.map((Item) => (
                          <Select.Option
                            key={Item?.group_id}
                            label={Item?.name}
                            value={Item?.group_id}
                          >
                            {Item?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Row style={{ gap: "5px" }}>
                      <Button
                        onClick={() => {
                          form.resetFields();
                        }}
                        htmlType="submit"
                        style={{
                          width: "48%",
                          height: "35px",
                          border: "none",
                          background: "var(--stroka-rang-2)",
                          borderRadius: "4px",
                          fontFamily: "var(--font-family)",
                          fontWeight: 500,
                          fontSize: "16px",
                          color: "var(--qizil-rang-1)",
                        }}
                      >
                        Tozalash
                      </Button>
                      <Button
                        htmlType="submit"
                        style={{
                          width: "48%",
                          height: "35px",
                          background: "var(--breand-rang-2)",
                          borderRadius: "4px",
                          border: "none",
                          fontFamily: "var(--font-family)",
                          fontWeight: 500,
                          fontSize: "16px",
                          color: "var(--oq-rang-1)",
                        }}
                      >
                        Saqlash
                      </Button>
                    </Row>
                  </Form>
                </Col>
              </Row>
            ) : null}
          </Col>
        </Row>
      </Row>
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
        <Col style={{ padding: "20px 20px" }}>
          <Row
            style={{
              borderRadius: "4px",
              padding: "6px 30px",
              gap: "96px",
              marginBottom: "10px",
            }}
          >
            <Row style={{ gap: "50px", width: "300px" }}>
              {["#", "O’qituvchilar F.I.O"].map((item, index) => (
                <Title
                  key={index}
                  level={2}
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "var(--filter-matn-rang-1)",
                    fontFamily: "var(--font-family)",
                    margin: 0,
                  }}
                >
                  {item}
                </Title>
              ))}
            </Row>
            <Row style={{ gap: "102px" }}>
              <Row style={{ gap: "91px" }}>
                {["Tug’ilgan sana", "Jinsi"].map((item, index) => (
                  <Title
                    key={index}
                    level={2}
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      color: "var(--filter-matn-rang-1)",
                      fontFamily: "var(--font-family)",
                      margin: 0,
                    }}
                  >
                    {item}
                  </Title>
                ))}
              </Row>
              <Row style={{ gap: "78px" }}>
                <Row style={{ gap: "50px" }}>
                  {["Gurux raqami  ", "Davomat"].map((item, index) => (
                    <Title
                      key={index}
                      level={2}
                      style={{
                        fontWeight: 500,
                        fontSize: "16px",
                        color: "var(--filter-matn-rang-1)",
                        fontFamily: "var(--font-family)",
                        margin: 0,
                      }}
                    >
                      {item}
                    </Title>
                  ))}
                </Row>
                <Row style={{ gap: "88px" }}>
                  {["To’lov", "Imkonyatlar"].map((item, index) => (
                    <Title
                      key={index}
                      level={2}
                      style={{
                        fontWeight: 500,
                        fontSize: "16px",
                        color: "var(--filter-matn-rang-1)",
                        fontFamily: "var(--font-family)",
                        margin: 0,
                      }}
                    >
                      {item}
                    </Title>
                  ))}
                </Row>
              </Row>
            </Row>
          </Row>
          <Col
            style={{
              fontFamily: "var(--font-family)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {data?.data.map((items, index) => (
              <StudentCard
                key={items?.user_id}
                id={(page - 1) * 10 + index + 1}
                user_id={items?.user_id}
                avatar={items?.images[0]?.url}
                fullname={items?.full_name}
                birthDate={items?.data_of_birth}
                gender={items?.gender}
                group={items?.group_members[0]?.group.name}
                indexItem={index}
                attendance={true}
                paymentType={items?.PaymentForStudent[items.PaymentForStudent.length - 1]?.type}
                sum={items?.PaymentForStudent[items.PaymentForStudent.length - 1]?.sum}
              />
            ))}
          </Col>
          <Row
            style={{
              width: "full",
              justifyContent: "center",
              padding: "30px 0px 10px 0px",
            }}
          >
            <Pagination
              align="center"
              className="custom-pagination"
              defaultCurrent={1}
              total={data?.meta.studentCount}
              onChange={(page: number) => {
                setPage(page);
              }}
            />
          </Row>
        </Col>
      )}
    </>
  );
};

export default Students;

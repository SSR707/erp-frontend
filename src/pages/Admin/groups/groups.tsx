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
import { useGetAllGroup } from "./service/query/useGetGroupFilter";
import { useNavigate } from "react-router-dom";
import { GroupCard } from "./components/GroupCard";
import { useState } from "react";
import LoadingSpinner from "@/components/CustomSpin/spin";
import { Dayjs } from "dayjs";
import { useSearchStore } from "@/store/useSearchStore";
interface FilterType {
  start_date: Dayjs;
  status: string;
}
interface IFilter {
  start_date: string | undefined;
  status: string;
}
const Groups = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { search } = useSearchStore();
  const [isFilterQuery, setFilterQuery] = useState<IFilter | null>(null);
  const { data, isLoading } = useGetAllGroup(
    page,
    10,
    isFilterQuery?.status,
    isFilterQuery?.start_date,
    search
  );
  const [isFilter, setFilter] = useState(false);
  const [form] = Form.useForm();
  const onFinish: FormProps<FilterType>["onFinish"] = (values) => {
    setFilterQuery({
      start_date: values.start_date?.format("YYYY-MM-DD") || undefined,
      status: values.status,
    });
  };
  return (
    <>
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
          Guruhlar jadvali
        </Title>
        <Row style={{ gap: "15px", alignItems: "center" }}>
          <Button
            onClick={() => navigate("/group/create")}
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
                    <Form.Item<FilterType> name="start_date">
                      <DatePicker
                        placeholder="Boshlanish sanasi"
                        className="filter_form__input"
                      />
                    </Form.Item>
                    <Form.Item<FilterType> name="status">
                      <Select
                        style={{
                          width: "100%",
                          height: "33px",
                          background: "transparent",
                        }}
                        placeholder={
                          <span className="filter_form__span"> Holat</span>
                        }
                      >
                        <Select.Option value="ACTIVE">
                          <span style={{ color: "var(--breand-rang-2)" }}>
                            ACTIVE
                          </span>
                        </Select.Option>
                        <Select.Option value="INACTIVE">
                          {" "}
                          <span style={{ color: "var(--qizil-rang-1)" }}>
                            INACTIVE
                          </span>
                        </Select.Option>
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
              padding: "6px 40px ",
              gap: "96px",
              marginBottom: "10px",
            }}
          >
            <Row style={{ gap: "50px", width: "333px" }}>
              {["#", "Nomi"].map((item, index) => (
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
            <Row style={{ gap: "250px" }}>
              {["Boshlangan sana", "Holati", "Imkonyatlar"].map(
                (item, index) => (
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
                )
              )}
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
              <GroupCard
                groupId={items?.group_id}
                key={items?.group_id}
                id={index + 1}
                name={items?.name}
                startDate={items?.start_date}
                status={items?.status}
                indexItem={index}
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
              total={data?.meta?.totalCount}
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

export default Groups;

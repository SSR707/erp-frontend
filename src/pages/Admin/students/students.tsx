import { Button, Col, Pagination, Row, Spin } from "antd";
import Title from "antd/es/typography/Title";
//@ts-ignore
import AddIconSvg from "@/assets/svg/add.icon.svg";
//@ts-ignore
import FilterSvg from "@/assets/svg/fillter.icon.svg";
import { StudentCard } from "./components/StudentCard";
import useGetAllStudent from "./service/query/useGetAllStudent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Students = () => {
  const [page, setPage] = useState<number>(1);
  console.log(page);
  const { data, isLoading } = useGetAllStudent(page, 10);
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
          <Button
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
          <Spin size="large" />
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
                key={items.user_id}
                id={(page - 1) * 10 + index + 1}
                avatar={items?.images[0]?.url}
                fullname={items?.full_name}
                birthDate={items?.data_of_birth}
                gender={items?.gender}
                group={items?.group_members[0]?.group.name}
                indexItem={index}
                attendance={true}
                paymentType={items?.PaymentForStudent[0].type}
                sum={items?.PaymentForStudent[0].sum}
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

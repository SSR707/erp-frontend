import { Button, Col, Row, Spin } from "antd";
import Title from "antd/es/typography/Title";
//@ts-ignore
import AddIconSvg from "@/assets/svg/add.icon.svg";
//@ts-ignore
import FilterSvg from "@/assets/svg/fillter.icon.svg";
import { useGetAllGroup } from "@/pages/Admin/studetn-create/service/query/useGetAllGroup";
import { useNavigate } from "react-router-dom";
import { GroupCard } from "./components/GroupCard";
const Groups = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllGroup();
  console.log(data);
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
          O’qituvchilar jadvali
        </Title>
        <Row style={{ gap: "15px", alignItems: "center" }}>
          <Button
            // onClick={() => navigate()}
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
              padding: "6px 40px",
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
              {["Boshlangan sana", "Daraja", "Imkonyatlar"].map(
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
                key={index}
                id={index + 1}
                name={items?.name}
                startDate={items.created_at}
                status={items?.status}
                indexItem={index}
              />
            ))}
          </Col>
        </Col>
      )}
    </>
  );
};

export default Groups;

import { Avatar, Button, Col, Row, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
//@ts-ignore
import OkIconSvg from "@/assets/svg/ok.icon.svg";
//@ts-ignore
import NoiconSvg from "@/assets/svg/no.icon.svg";
//@ts-ignore
import EditIconSvg from "@/assets/svg/edit.icon.svg";
//@ts-ignore
import DeleteIconSvg from "@/assets/svg/delete.icon.svg";
import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export interface IStudentCard {
  id: number;
  avatar: string;
  fullname: string;
  birthDate: string;
  attendance: boolean;
  group: string;
  gender: string;
  indexItem: number;
  paymentType: string | undefined ;
  sum: number | undefined;
  user_id: string;
}

export const StudentCard = ({
  id,
  avatar,
  fullname,
  birthDate,
  attendance,
  group,
  gender,
  indexItem,
  paymentType,
  sum,
  user_id,
}: IStudentCard) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Row
      style={{
        boxShadow: " 2px 2px 4px 0 rgba(0, 0, 0, 0.1)",
        background: "var(--oq-rang-1)",

        borderRadius: "4px",
        padding: "15px 30px",
      }}
    >
      <Row style={{ alignItems: "center", gap: "60px" }}>
        <Row
          style={{
            alignItems: "center",
            gap: indexItem < 9 ? "50px" : "43px",
          }}
        >
          {" "}
          <Title
            level={2}
            style={{
              fontWeight: 400,
              fontSize: "16px",
              color: "var(--matn-rang-1)",
              fontFamily: "var(--font-family)",
              margin: 0,
            }}
          >
            {id}
          </Title>
          <Row style={{ gap: "10px", alignItems: "center" }}>
            <Avatar src={avatar} />
            <Title
              level={2}
              style={{
                fontWeight: 400,
                fontSize: "16px",
                color: "var(--matn-rang-1)",
                fontFamily: "var(--font-family)",
                margin: 0,
                width: "250px",
                overflow: "hidden",
              }}
            >
              {fullname}
            </Title>{" "}
          </Row>
        </Row>
        <Row style={{ alignItems: "center", gap: "91px" }}>
          <Title
            level={2}
            style={{
              fontWeight: 400,
              fontSize: "16px",
              color: "var(--matn-rang-1)",
              fontFamily: "var(--font-family)",
              margin: 0,
            }}
          >
            {dayjs(birthDate).format("DD-MM-YYYY")}
          </Title>
          <Row style={{ width: "69px" }}>
            <Tag color={gender === "MALE" ? "green" : "red"}>
              {gender === "MALE" ? "O’g’il bola" : "Qiz bola"}
            </Tag>
          </Row>
          <Title
            level={2}
            style={{
              fontWeight: 400,
              fontSize: "16px",
              width: "53px",
              color: "var(--matn-rang-1)",
              fontFamily: "var(--font-family)",
              margin: 0,
              textAlign: "center",
            }}
          >
            {group}
          </Title>
          {attendance ? (
            <img src={OkIconSvg} alt="" />
          ) : (
            <img src={NoiconSvg} alt="" />
          )}
          <Col
            style={{
              position: "relative",
              display: "inline-block",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Button
              style={{
                fontFamily: "var(--font-family)",
                fontWeight: 400,
                fontSize: "16px",
                color: "var(--matn-rang-1)",
                border: "1px solid var(--qidiruv-tizimi-1)",
                borderRadius: "4px",
                padding: "6px",
                boxShadow: "2px 2px 2px 0 rgba(0, 0, 0, 0.1)",
                background: "var(--stroka-rang-2)",
              }}
            >
              To’lov
            </Button>
            {isHovered ? (
              <Row
                style={{
                  position: "absolute",
                  top: indexItem < 5 ? "170%" : "-255px",
                  flexDirection: "column",
                  left: -70,
                  width: "200px",
                  border: "1px solid var(--qidiruv-tizimi-1)",
                  borderRadius: "4px",
                  boxShadow: "2px 2px 4px 0 rgba(0, 0, 0, 0.1)",
                  background: "var(--oq-rang-1)",
                  zIndex: 999,
                }}
              >
                <Title
                  level={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "24px",
                    padding: "10px",
                    color: "var(--matn-rang-1)",
                    fontFamily: "var(--font-family)",
                    margin: 0,
                    borderBottom: "2px solid var(--qidiruv-tizimi-1) ",
                  }}
                >
                  To’lov jadvali
                </Title>
                <Col style={{ padding: "10px" }}>
                  {[
                    { ism: fullname.split(" ")[0] },
                    { Familiya: fullname.split(" ")[1] },
                    {
                      Sharfi:
                        fullname.split(" ")[2] + " " + fullname.split(" ")[3],
                    },
                    { "To’lov": paymentType === "CASH" ? "NAQD" : "KARTA" },
                    { Summa: sum },
                  ].map((item, index) => {
                    const [key, value] = Object.entries(item)[0];
                    return (
                      <Title
                        key={index}
                        level={2}
                        style={{
                          fontWeight: 600,
                          fontSize: "16px",
                          color: "var(--matn-rang-1)",
                          fontFamily: "var(--font-family)",
                          margin: 0,
                          marginTop: "8px",
                        }}
                      >
                        {key}: <span>{value}</span>
                      </Title>
                    );
                  })}
                </Col>
              </Row>
            ) : null}
          </Col>
          <Button
            onClick={() => navigate(`/student/${user_id}`)}
            style={{
              border: "none",
              background: "var(--breand-rang-2)",
              padding: "10px 15px",
              boxShadow: "none",
            }}
          >
            <EyeOutlined style={{ fontSize: "24px", color: "#fff" }} />
          </Button>
        </Row>
      </Row>
    </Row>
  );
};

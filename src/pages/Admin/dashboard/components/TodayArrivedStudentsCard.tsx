import { Avatar, Row, Tag } from "antd";
import Title from "antd/es/typography/Title";

export interface IUserCard {
  id: number;
  avatar: string;
  fullname: string;
  gender: string;
}

export const TodayArrivedStudentsCard = ({
  id,
  avatar,
  fullname,
  gender,
}: IUserCard) => {
  return (
    <Row style={{ alignItems: "center", gap: "27px" }}>
      <Row style={{ alignItems: "center", gap: "20px" }}>
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
          <Avatar
            src={
              avatar
                ? avatar
                : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
            }
          />
          <Title
            level={2}
            style={{
              fontWeight: 400,
              fontSize: "16px",
              color: "var(--matn-rang-1)",
              fontFamily: "var(--font-family)",
              margin: 0,
              width: "230px",
              overflow: "hidden",
            }}
          >
            {fullname}
          </Title>{" "}
        </Row>
      </Row>
      <Tag color={gender === "male" ? "green" : "red"}>
        {gender === "male" ? "O’g’il bola" : "Qiz bola"}
      </Tag>
    </Row>
  );
};

import { Row, Tag } from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";

export interface IGroupMemberCard {
  id: number;
  fullname: string | undefined;
  gender: string | undefined;
  birth_date: string | undefined;
}

export const GroupMemberCard = ({
  id,
  fullname,
  gender,
  birth_date,
}: IGroupMemberCard) => {
  return (
    <Row
      style={{
        boxShadow: " 2px 2px 4px 0 rgba(0, 0, 0, 0.1)",
        background: "var(--oq-rang-1)",
        borderRadius: "4px",
        padding: "15px 20px 15px 15px",
        border: "1px solid var(--qidiruv-tizimi-1)",
      }}
    >
      <Row style={{ alignItems: "center", gap: "10px" }}>
        <Row
          style={{
            alignItems: "center",
            gap: id < 9 ? "20px" : "15px",
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
          <Title
            level={2}
            style={{
              fontWeight: 400,
              fontSize: "16px",
              color: "var(--matn-rang-1)",
              fontFamily: "var(--font-family)",
              margin: 0,
              width: "290px",
              overflow: "hidden",
            }}
          >
            {fullname}
          </Title>{" "}
        </Row>
        <Row style={{ alignItems: "center", gap: "55px" }}>
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
            {dayjs(birth_date).format("DD-MM-YYYY")}
          </Title>
          <Row style={{ width: "78px", justifyContent: "center" }}>
            <Tag
              style={{ margin: "0" }}
              color={gender === "MALE" ? "green" : "red"}
            >
              {gender === "MALE" ? "O’g’il bola" : "Qiz bola"}
            </Tag>
          </Row>
        </Row>
      </Row>
    </Row>
  );
};

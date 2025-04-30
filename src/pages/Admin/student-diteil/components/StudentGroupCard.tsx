import { Row, Tag } from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";

export interface IGroupCard {
  id: number;
  name: string;
  status: string;
  startDate: string;
  groupId?: string;
}

export const StudentGroupCard = ({
  id,
  name,
  startDate,
  status,
}: IGroupCard) => {
  return (
    <Row
      style={{
        boxShadow: " 2px 2px 4px 0 rgba(0, 0, 0, 0.1)",
        background: "var(--oq-rang-1)",
        borderRadius: "4px",
        padding: "15px 15px",
        border: "1px solid var(--qidiruv-tizimi-1)",
      }}
    >
      <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
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
              width: "250px",
              overflow: "hidden",
            }}
          >
            {name}
          </Title>{" "}
        </Row>
        <Row style={{ alignItems: "center", gap: "100px" }}>
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
            {dayjs(startDate).format("DD-MM-YYYY")}
          </Title>
          <Row style={{ width: "78px", justifyContent: "center" }}>
            <Tag color={status === "ACTIVE" ? "green" : "red"}>
              {status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
            </Tag>
          </Row>
        </Row>
      </Row>
    </Row>
  );
};

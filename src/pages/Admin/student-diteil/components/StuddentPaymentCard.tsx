import { Row, Tag } from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";

export interface IGroupCard {
  id: number;
  sum: number;
  paymentType: string;
  paidDate: string;
}

export const StudentPaymentCard = ({
  id,
  sum,
  paymentType,
  paidDate,
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
            {sum} so'm
          </Title>{" "}
        </Row>

        <Row style={{ alignItems: "center", gap: "100px" }}>
          <Row style={{ width: "78px", justifyContent: "center" }}>
            <Tag color={paymentType === "CASH" ? "green" : "blue"}>
              {paymentType === "CASH" ? "NAQD" : "UZCARD"}
            </Tag>
          </Row>
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
            {dayjs(paidDate).format("DD-MM-YYYY")}
          </Title>
        </Row>
      </Row>
    </Row>
  );
};

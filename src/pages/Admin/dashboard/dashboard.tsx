import { Col } from "antd";
import Title from "antd/es/typography/Title";

const Dashboard = () => {
  return (
    <>
      <Col
        style={{ padding: "22px 20px 20px 20px", borderBottom: "1px solid var(--qidiruv-tizimi-1)" }}
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
          Asosiy bo’lim
        </Title>
      </Col>
    </>
  );
};

export default Dashboard;

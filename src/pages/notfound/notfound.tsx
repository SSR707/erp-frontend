import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      style={{ marginTop: "100px" }}
      subTitle=" Ushbu sahifa topilmadi"
      extra={
        <Button
          onClick={() => navigate("/")}
          style={{
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
          Bosh sahifaga qaytish
        </Button>
      }
    />
  );
};

export default NotFound;

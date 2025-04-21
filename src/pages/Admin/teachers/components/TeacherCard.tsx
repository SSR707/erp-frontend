import { Avatar, Button, Row, Tag } from "antd";
import Title from "antd/es/typography/Title";
//@ts-ignore
import OkIconSvg from "@/assets/svg/ok.icon.svg";
//@ts-ignore
import NoiconSvg from "@/assets/svg/no.icon.svg";
//@ts-ignore
import EditIconSvg from "@/assets/svg/edit.icon.svg";
//@ts-ignore
import DeleteIconSvg from "@/assets/svg/delete.icon.svg";
import dayjs from "dayjs";
import { formatPhoneNumber } from "@/utils/format/format.phone.nuber";

export interface IStudentCard {
  id: number;
  avatar: string;
  fullname: string;
  birthDate: string;
  gender: string;
  phone_number: string;
  indexItem: number;
}

export const TeacherCard = ({
  id,
  avatar,
  fullname,
  birthDate,
  phone_number,
  indexItem,
  gender,
}: IStudentCard) => {
  const phone = formatPhoneNumber(phone_number);
  return (
    <Row
      style={{
        boxShadow: " 2px 2px 4px 0 rgba(0, 0, 0, 0.1)",
        background: "var(--oq-rang-1)",

        borderRadius: "4px",
        padding: "15px 40px",
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
                width: "280px",
                overflow: "hidden",
              }}
            >
              {fullname}
            </Title>{" "}
          </Row>
        </Row>
        <Row style={{ alignItems: "center", gap: "130px" }}>
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
              color: "var(--matn-rang-1)",
              fontFamily: "var(--font-family)",
              margin: 0,
              textAlign: "center",
            }}
          >
            {phone}
          </Title>
          <Row style={{ gap: "15px", alignItems: "center" }}>
            <Button
              style={{
                border: "none",
                background: "transparent",
                padding: "0px",
                boxShadow: "none",
              }}
            >
              <img src={EditIconSvg} alt="" />
            </Button>
            <Button
              style={{
                border: "none",
                background: "transparent",
                padding: "0px",
                boxShadow: "none",
              }}
            >
              <img src={DeleteIconSvg} alt="" />
            </Button>
          </Row>
        </Row>
      </Row>
    </Row>
  );
};

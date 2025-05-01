import { Button, Col, Image, Row, Upload } from "antd";
import Title from "antd/es/typography/Title";
//@ts-ignore
import CardIcon from "@/assets/svg/card.bg.icon.svg";
//@ts-ignore
import EditIcon from "@/assets/svg/edit.icon.svg";
import { useGetAmdinProfile } from "../layout/service/query/useGetAmdinProfile";
import { formatPhoneNumber } from "@/utils/format/format.phone.nuber";
import dayjs from "dayjs";
import LoadingSpinner from "@/components/CustomSpin/spin";
import ConfirmPassword from "./components/ProfileUpdatePasswordModal";
import { useState } from "react";
import ProfileUpdateModal from "./components/ProfileUpdateModel";

const Settings = () => {
  const { data, isLoading } = useGetAmdinProfile();
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
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
          Sozlamalar
        </Title>
        <Row style={{ gap: "15px", alignItems: "center" }}>
          <Button
            onClick={() => setModal2Open(true)}
            style={{
              display: "flex",
              gap: "10px",
              padding: "18px 20px",
              fontFamily: " var(--font-family)",
              fontWeight: 500,
              fontSize: "16px",
              alignItems: "center",
              color: "var(--breand-rang-2)",
              border: "1px solid var(--qidiruv-tizimi-1)",
              borderRadius: "4px",
              boxShadow: "2px 2px 2px 0 rgba(0, 0, 0, 0.1)",
              background: "var(--stroka-rang-2)",
            }}
          >
            <img src={EditIcon} alt="" />
            Tahrirlash
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
          <LoadingSpinner />
        </Row>
      ) : (
        <Col
          style={{
            padding: "20px",
            fontFamily: "var(--font-family)",
            display: "flex",
            gap: "20px",
          }}
        >
          <Col
            style={{
              background: "var(--oq-rang-1)",
              border: "1px solid var(--qidiruv-tizimi-1)",
              borderRadius: "4px",
              padding: "30px 25px",
              width: "50%",
            }}
          >
            <Row
              justify={"center"}
              style={{
                backgroundImage: `url(${CardIcon}), url(${CardIcon})`,
                backgroundRepeat: "no-repeat, no-repeat",
                backgroundPosition: "5% 0%, 95% 100%",
              }}
            >
              <Col
                style={{
                  width: 200,
                  height: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Image
                  width={200}
                  height={200}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={data?.data?.images[0]?.url ?? ""}
                />

                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  showUploadList={false}
                >
                  <Button
                    style={{
                      position: "absolute",
                      bottom: "-5px",
                      right: "0px",
                      padding: "5px",
                      backgroundColor: "transparent",
                      border: "none",
                      borderRadius: "100%",
                    }}
                  >
                    <img src={EditIcon} alt="" />
                  </Button>
                </Upload>
              </Col>
            </Row>
            <Row style={{ marginTop: "40px", padding: "0px 20px" }}>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {[
                  { "Ismi familyasi": data?.data?.full_name },
                  {
                    "Telefon raqam": formatPhoneNumber(
                      data?.data?.phone_number ?? ""
                    ),
                  },
                  { "Yashash mazmuni": data?.data?.address },
                  {
                    "Tug’ilgan sanasi": dayjs(data?.data?.data_of_birth).format(
                      "D MMMM, YYYY"
                    ),
                  },
                  {
                    Jins:
                      data?.data?.gender === "MALE"
                        ? "O’g’il bola"
                        : "Qiz bola",
                  },
                ].map((item, index) => {
                  const [key, value] = Object.entries(item)[0];
                  return (
                    <li key={index} className="user-diteil_list__itam">
                      {" "}
                      <Title
                        level={3}
                        style={{
                          fontWeight: 600,
                          fontSize: "18px",
                          fontFamily: "var(--font-family)",
                          color: "var(--matn-rang-1)",
                          margin: "0px",
                        }}
                      >
                        {key}:{" "}
                      </Title>
                      <Title
                        level={3}
                        style={{
                          fontWeight: 700,
                          fontSize: "22px",
                          color: "var(--matn-rang-1)",
                          margin: "0px",
                          fontFamily: "var(--font-family)",
                        }}
                      >
                        {value}
                      </Title>
                    </li>
                  );
                })}
              </ul>
            </Row>
          </Col>
          <Col
            style={{
              gap: "20px",
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Col
              style={{
                backgroundImage: `url(${CardIcon})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "95% 20%",
                background: "var(--oq-rang-1)",
                border: "1px solid var(--qidiruv-tizimi-1)",
                borderRadius: "4px",
                padding: "20px 25px  ",
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {" "}
              <Title
                level={2}
                style={{
                  fontWeight: 600,
                  fontSize: "24px",
                  color: "var(--matn-rang-1)",
                  fontFamily: "var(--font-family)",
                  margin: 0,
                }}
              >
                {" "}
                Login
              </Title>
              <Title
                level={2}
                style={{
                  fontWeight: 600,
                  fontSize: "25px",
                  color: "var(--matn-rang-1)",
                  fontFamily: "var(--font-family)",
                  margin: 0,
                }}
              >
                {" "}
                {data?.data?.username}
              </Title>
            </Col>

            <Col
              style={{
                backgroundImage: `url(${CardIcon})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "95% 20%",
                background: "var(--oq-rang-1)",
                border: "1px solid var(--qidiruv-tizimi-1)",
                borderRadius: "4px",
                padding: "20px 25px  ",
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {" "}
              <Row
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                {" "}
                <Title
                  level={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "24px",
                    color: "var(--matn-rang-1)",
                    fontFamily: "var(--font-family)",
                    margin: 0,
                  }}
                >
                  {" "}
                  Parol
                </Title>
                <Button
                  onClick={() => setModal1Open(true)}
                  style={{
                    border: "none",
                  }}
                >
                  <img src={EditIcon} alt="" />
                </Button>
              </Row>
              <Title
                level={2}
                style={{
                  fontWeight: 800,
                  fontSize: "40px",
                  color: "var(--matn-rang-1)",
                  fontFamily: "var(--font-family)",
                  margin: 0,
                }}
              >
                {" "}
                .......
              </Title>
            </Col>
          </Col>
          <ConfirmPassword
            isOpen={modal1Open}
            setIsOpen={() => setModal1Open(false)}
          />
          <ProfileUpdateModal
            id={data?.data?.user_id}
            isOpen={modal2Open}
            setIsOpen={() => setModal2Open(false)}
          />
        </Col>
      )}
    </>
  );
};

export default Settings;

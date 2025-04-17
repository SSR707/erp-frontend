import { Button, Col, Dropdown, MenuProps, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
const dataSource = [
  {
    key: "1",
    name: "Sultonov Shokirjon Tursinjon o’g’li",
    dob: "15.05.1996",
    gender: "male",
    contact: "+998 (93) 123-45-67",
    address: "Toshkent. Sentr",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    key: "2",
    name: "Nodirova Shodiya Tursinjon qizi",
    dob: "15.05.1996",
    gender: "female",
    contact: "+998 (93) 123-45-67",
    address: "Toshkent. Sentr",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    key: "3",
    name: "Sultonov Shokirjon Tursinjon o’g’li",
    dob: "15.05.1996",
    gender: "male",
    contact: "+998 (93) 123-45-67",
    address: "Toshkent. Sentr",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
];

// @ts-ignore
import CategoryMenuIcon from "@/assets/svg/menu.category.icon.svg";
import { UserCard } from "./components/UserCard";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Teachers
      </a>
    ),
  },
];

const Dashboard = () => {
  const [category, setCategory] = useState("O’qituvchilar");
  return (
    <>
      <Col
        style={{
          padding: "22px 20px 20px 20px",
          borderBottom: "1px solid var(--qidiruv-tizimi-1)",
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
          Asosiy bo’lim
        </Title>
      </Col>
      <Col
        style={{
          padding: "40px 20px",
          fontFamily: "var(--font-family)",
        }}
      >
        <Row>
          <Col
            style={{
              background: "var(--oq-rang-1)",
              border: "1px solid var(--qidiruv-tizimi-1)",
              borderRadius: "4px",
              width: "70%",
            }}
          >
            <Row
              justify={"space-between"}
              style={{
                padding: "20px",
                borderBottom: "2px solid  var(--qidiruv-tizimi-1)",
              }}
            >
              <Title
                level={2}
                style={{
                  fontWeight: 400,
                  fontSize: "26px",
                  color: "var(--matn-rang-1)",
                  margin: 0,
                }}
              >
                {" "}
                O’qituvchilar soni:{" "}
                <span
                  style={{
                    fontSize: "22px",
                    color: "var(--breand-rang-1)",
                  }}
                >
                  40 ta
                </span>
              </Title>

              <Row style={{ gap: "15px" }}>
                <Dropdown menu={{ items }} placement="bottom">
                  <Button style={{ padding: "0px 5px" }}>
                    <img
                      src={CategoryMenuIcon}
                      style={{ width: "24px", height: "24px" }}
                      alt=""
                    />
                  </Button>
                </Dropdown>

                {["O’qituvchilar", "Guruhlar", "Menegerlar"].map(
                  (item, index) => (
                    <Button
                      key={index}
                      onClick={() => setCategory(item)}
                      style={{
                        fontWeight: 500,
                        padding: "0px 20px",
                        fontSize: "16px",
                        color:
                          category === item
                            ? "var(--breand-rang-2)"
                            : "var(--matn-rang-1)",
                        boxShadow:
                          category === item
                            ? "2px 2px 2px 0 rgba(0, 0, 0, 0.1)"
                            : "none",
                        background: "var(--stroka-rang-2)",
                      }}
                    >
                      {item}
                    </Button>
                  )
                )}
              </Row>
            </Row>
            <Row
              style={{
                flexDirection: "column",
                padding: "0px 20px 20px 20px",
                gap: "15px",
              }}
            >
              <Row>
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
                  #
                </Title>
              </Row>
              {dataSource.map((items, index) => (
                <UserCard
                  id={index + 1}
                  avatar={items.avatar}
                  fullname={items.name}
                  birthDate={items.dob}
                  gender={items.gender}
                  phoneNumber={items.contact}
                  address={items.address}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Dashboard;

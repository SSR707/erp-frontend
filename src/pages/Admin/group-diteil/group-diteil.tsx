import { Button, Col, Modal, notification, Row } from "antd";
import Title from "antd/es/typography/Title";
//@ts-ignore
import DeleteIcon from "@/assets/svg/delete.icon.svg";
//@ts-ignore
import EditIcon from "@/assets/svg/edit.icon.svg";
//@ts-ignore
import CardIcon from "@/assets/svg/card.bg.icon.svg";
// @ts-ignore
import AddGroupIcon from "@/assets/svg/menu-icon-2.svg";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GroupMemberCard } from "./components/GroupMemberCard";
import { useGetGroupById } from "./service/query/useGetGroupById";
import dayjs from "dayjs";
import LoadingSpinner from "@/components/CustomSpin/spin";
import { useDeleteGroupById } from "./service/mutation/useDeleteGroupById";
import AddMemberGroup from "./components/AddMemberGroup";
import GroupEditModal from "./components/GroupEditModal";

const GroupDiteil = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { data, isLoading } = useGetGroupById(id);
  const { mutate: deletegGroup, isPending } = useDeleteGroupById();
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const handleDeleteGroup = () => {
    deletegGroup(id, {
      onSuccess: () => {
        api.success({
          message: `Ajoyib natija`,
          description: "O'quvchi muvaffaqiyatli ochirildi.",
        });
        navigate(-1);
      },
      onError: (err: any) => {
        api.error({
          message: `Bekor qilindi!`,
          description: ` O'quvchi ochirish muvaffaqiyatsiz bajarildi  ${err?.response?.data?.message}`,
        });
      },
    });
    setModal2Open(false);
  };
  return (
    <>
      {contextHolder}
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
          Guruh haqida
        </Title>
        <Row style={{ gap: "15px", alignItems: "center" }}>
          <Button
            loading={isPending}
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
            <img src={DeleteIcon} alt="" />
            O’chirish
          </Button>
          <Button
            onClick={() => setModal3Open(true)}
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
          <Button
            onClick={() => setModal1Open(true)}
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
            <img src={AddGroupIcon} alt="" />
            Guruhga Oquvchi Biriktirish
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
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              height: "490px",
            }}
          >
            <Col
              style={{
                background: "var(--oq-rang-1)",
                border: "1px solid var(--qidiruv-tizimi-1)",
                borderRadius: "4px",
                height: "37%",
                padding: "30px 25px",
                backgroundImage: `url(${CardIcon}), url(${CardIcon})`,
                backgroundRepeat: "no-repeat, no-repeat",
                backgroundPosition: "50% 10%, 95% 100%",
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {[
                  { "Guruh nomi": data?.data.name },
                  {
                    "boshlangan sana": dayjs(data?.data.start_date).format(
                      "D MMMM, YYYY"
                    ),
                  },
                  {
                    Holati: data?.data.status,
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
            </Col>
            <Col
              style={{
                background: "var(--oq-rang-1)",
                border: "1px solid var(--qidiruv-tizimi-1)",
                borderRadius: "4px",
                height: "63%",
              }}
            >
              <Title
                level={2}
                style={{
                  fontWeight: 600,
                  padding: "20px 20px 10px 20px",
                  fontSize: "26px",
                  color: "var(--matn-rang-1)",
                  fontFamily: "var(--font-family)",
                  borderBottom: "1px solid var(--qidiruv-tizimi-1)",
                  margin: 0,
                }}
              >
                {" "}
                O’qituvchilar
              </Title>
              <Col
                style={{
                  padding: "0px  20px 0px 30px",
                }}
              >
                <Row
                  style={{
                    borderRadius: "4px",
                    padding: "15px 15px  ",
                    gap: "170px",
                  }}
                >
                  <Row style={{ gap: "20px" }}>
                    {["#", "O’qituvchilar F.I.O"].map((item, index) => (
                      <Title
                        key={index}
                        level={2}
                        style={{
                          fontWeight: 500,
                          fontSize: "16px",
                          color: "var(--filter-matn-rang-1)",
                          fontFamily: "var(--font-family)",
                          margin: 0,
                        }}
                      >
                        {item}
                      </Title>
                    ))}
                  </Row>
                  <Row style={{ gap: "65px" }}>
                    {["Tug’ilgan sana", "Jinsi"].map((item, index) => (
                      <Title
                        key={index}
                        level={2}
                        style={{
                          fontWeight: 500,
                          fontSize: "16px",
                          color: "var(--filter-matn-rang-1)",
                          fontFamily: "var(--font-family)",
                          margin: 0,
                        }}
                      >
                        {item}
                      </Title>
                    ))}
                  </Row>
                </Row>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    height: "150px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    paddingRight: "10px",
                  }}
                  className="custom-scroll"
                >
                  <GroupMemberCard
                    id={1}
                    fullname={data?.data?.teacher?.full_name}
                    birth_date={data?.data?.teacher?.data_of_birth}
                    gender={data?.data?.teacher?.gender}
                  />
                </Col>
              </Col>
            </Col>
          </Col>
          <Col
            style={{
              background: "var(--oq-rang-1)",
              border: "1px solid var(--qidiruv-tizimi-1)",
              borderRadius: "4px",
              height: "full",
            }}
          >
            <Title
              level={2}
              style={{
                fontWeight: 600,
                padding: "20px 20px 10px 20px",
                fontSize: "26px",
                color: "var(--matn-rang-1)",
                fontFamily: "var(--font-family)",
                borderBottom: "1px solid var(--qidiruv-tizimi-1)",
                margin: 0,
              }}
            >
              {" "}
              O’quvchilar soni:{" "}
              <span style={{ color: "var(--breand-rang-2)" }}>
                {data?.data.group_members.length} ta
              </span>
            </Title>
            <Col
              style={{
                padding: "0px  10px 0px 20px",
              }}
            >
              <Row
                style={{
                  borderRadius: "4px",
                  padding: "15px 15px  ",
                  gap: "170px",
                }}
              >
                <Row style={{ gap: "20px" }}>
                  {["#", "O’qituvchilar F.I.O"].map((item, index) => (
                    <Title
                      key={index}
                      level={2}
                      style={{
                        fontWeight: 500,
                        fontSize: "16px",
                        color: "var(--filter-matn-rang-1)",
                        fontFamily: "var(--font-family)",
                        margin: 0,
                      }}
                    >
                      {item}
                    </Title>
                  ))}
                </Row>
                <Row style={{ gap: "65px" }}>
                  {["Tug’ilgan sana", "Jinsi"].map((item, index) => (
                    <Title
                      key={index}
                      level={2}
                      style={{
                        fontWeight: 500,
                        fontSize: "16px",
                        color: "var(--filter-matn-rang-1)",
                        fontFamily: "var(--font-family)",
                        margin: 0,
                      }}
                    >
                      {item}
                    </Title>
                  ))}
                </Row>
              </Row>
              <Col
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  height: "350px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  paddingRight: "10px",
                }}
                className="custom-scroll"
              >
                {data?.data?.group_members.map((item, index) => (
                  <GroupMemberCard
                    key={item?.group_members_id}
                    id={index + 1}
                    fullname={item?.user?.full_name}
                    birth_date={item?.user?.data_of_birth}
                    gender={item?.user?.gender}
                  />
                ))}
              </Col>
            </Col>
          </Col>
          <Modal
            centered
            closable={false}
            open={modal2Open}
            footer={[
              <Button
                key="cancel"
                onClick={() => setModal2Open(false)}
                style={{
                  backgroundColor: "var(--qidiruv-tizimi-1)",
                  color: "#000",
                  margin: "0 8px",
                  border: "none",
                  padding: "20px 30px",
                }}
              >
                Yo'q
              </Button>,
              <Button
                key="cancel"
                onClick={() => {
                  handleDeleteGroup(), setModal2Open(false);
                }}
                style={{
                  backgroundColor: "var(--breand-rang-1)",
                  color: "#fff",
                  margin: "0 8px",
                  border: "none",
                  padding: "20px 30px",
                }}
              >
                Ha
              </Button>,
            ]}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: "24px",
                color: "var(--matn-rang-1)",
                fontFamily: "var(--font-family)",
                margin: "15px 0px",
              }}
            >
              O’chirishni xoxlaysizmi?
            </p>
          </Modal>
          <AddMemberGroup
            group_id={id}
            isOpen={modal1Open}
            setIsOpen={() => setModal1Open(false)}
          />
          <GroupEditModal
            group_id={id}
            isOpen={modal3Open}
            setIsOpen={() => setModal3Open(false)}
          />
        </Col>
      )}
    </>
  );
};

export default GroupDiteil;

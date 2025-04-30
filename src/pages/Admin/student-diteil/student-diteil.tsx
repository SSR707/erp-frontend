import { Button, Col, Image, Modal, notification, Row } from "antd";
import Title from "antd/es/typography/Title";
//@ts-ignore
import DeleteIcon from "@/assets/svg/delete.icon.svg";
//@ts-ignore
import EditIcon from "@/assets/svg/edit.icon.svg";
//@ts-ignore
import CardIcon from "@/assets/svg/card.bg.icon.svg";
// @ts-ignore
import PaymetIcon from "@/assets/svg/menu-icon-5.svg";
import "./css/style.css";
import { StudentGroupCard } from "./components/StudentGroupCard";
import { StudentPaymentCard } from "./components/StuddentPaymentCard";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStudentById } from "./service/query/useGetStudentById";
import { formatPhoneNumber } from "@/utils/format/format.phone.nuber";
import dayjs from "dayjs";
import LoadingSpinner from "@/components/CustomSpin/spin";
import { useState } from "react";
import { useDeleteStudentById } from "./service/mutation/useDeleteStudentById";
import StudentPaymentCreate from "./components/StudentPayment";

const StudentDiteil = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetStudentById(id);
  const [api, contextHolder] = notification.useNotification();
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const navigate = useNavigate();
  const { mutate: deleteStudent, isPending } = useDeleteStudentById();
  const handleDeleteStudent = () => {
    deleteStudent(id, {
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
          O’quvchi haqida
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
            onClick={() => navigate(`/student/${id}/edit`)}
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
            <img src={PaymetIcon} alt="" />
            Tolov qilish
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
            {" "}
            <Col
              style={{
                background: "var(--oq-rang-1)",
                border: "1px solid var(--qidiruv-tizimi-1)",
                borderRadius: "4px",
                height: "50%",
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
                Guruhlar
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
                    gap: "195px",
                  }}
                >
                  <Row style={{ gap: "20px" }}>
                    {["#", "Nomi"].map((item, index) => (
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
                  <Row style={{ gap: "90px" }}>
                    {["Boshlangan sana", "Holati"].map((item, index) => (
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
                    height: "120px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    paddingRight: "10px",
                  }}
                  className="custom-scroll"
                >
                  {data?.data?.group_members.map((item, index) => (
                    <StudentGroupCard
                      key={item?.group?.group_id}
                      startDate={item?.group?.start_date}
                      name={item?.group?.name}
                      status={item?.group?.status}
                      id={index + 1}
                    />
                  ))}
                </Col>
              </Col>
            </Col>
            <Col
              style={{
                background: "var(--oq-rang-1)",
                border: "1px solid var(--qidiruv-tizimi-1)",
                borderRadius: "4px",
                height: "50%",
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
                Tolovlar
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
                    gap: "195px",
                  }}
                >
                  <Row style={{ gap: "20px" }}>
                    {["#", "Miqdori"].map((item, index) => (
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
                  <Row style={{ gap: "130px" }}>
                    {["To'lov turi", "Vaqti"].map((item, index) => (
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
                    height: "120px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    paddingRight: "10px",
                  }}
                  className="custom-scroll"
                >
                  {data?.data?.PaymentForStudent.map((item, index) => (
                    <StudentPaymentCard
                      key={index}
                      id={index + 1}
                      sum={item?.sum}
                      paymentType={item?.type}
                      paidDate={item?.created_at}
                    />
                  ))}
                </Col>
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
                  handleDeleteStudent(), setModal2Open(false);
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
          <StudentPaymentCreate
            student_id={id}
            isOpen={modal1Open}
            setIsOpen={() => setModal1Open(false)}
          />
        </Col>
      )}
    </>
  );
};

export default StudentDiteil;

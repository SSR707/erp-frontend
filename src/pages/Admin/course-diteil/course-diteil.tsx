import { Button, Col, Modal, notification, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useGetCourseById } from "./service/query/useGetCourseById";
import { useNavigate, useParams } from "react-router-dom";
import { GroupCard } from "../groups/components/GroupCard";
import LoadingSpinner from "@/components/CustomSpin/spin";
//@ts-ignore
import DeleteIcon from "@/assets/svg/delete.icon.svg";
//@ts-ignore
import EditIcon from "@/assets/svg/edit.icon.svg";
import { useDeleteCourseById } from "./service/mutation/useDeleteCourseById";
import { useState } from "react";
import CourseEditModal from "./components/CourseEditModal";
const CourseDiteil = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCourseById(id);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { mutate: deleteCourse, isPending } = useDeleteCourseById();
  const [modal2Open, setModal2Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const handleDeleteStudent = () => {
    deleteCourse(id, {
      onSuccess: () => {
        api.success({
          message: `Ajoyib natija`,
          description: "Kurs muvaffaqiyatli ochirildi.",
        });
        navigate(-1);
      },
      onError: (err: any) => {
        api.error({
          message: `Bekor qilindi!`,
          description: `Kurs ochirish muvaffaqiyatsiz bajarildi  ${err?.response?.data?.message}`,
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
          Kurs haqida
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
        <Col style={{ padding: "20px 20px" }}>
          <Row
            style={{
              borderRadius: "4px",
              padding: "6px 40px ",
              gap: "115px",
              marginBottom: "10px",
            }}
          >
            <Row style={{ gap: "50px", width: "333px" }}>
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
            <Row style={{ gap: "255px" }}>
              <Row style={{ gap: "275px" }}>
                {["Davomiligi", "Holati"].map((item, index) => (
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
              <Title
                level={2}
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "var(--filter-matn-rang-1)",
                  fontFamily: "var(--font-family)",
                  margin: 0,
                }}
              >
                Imkonyatlar
              </Title>
            </Row>
          </Row>
          <Col
            style={{
              fontFamily: "var(--font-family)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {data?.groups.map((items, index) => (
              <GroupCard
                groupId={items?.group_id}
                key={items?.group_id}
                id={index + 1}
                name={items?.name}
                startDate={items?.start_date}
                status={items?.status}
                indexItem={index}
              />
            ))}
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
          <CourseEditModal
            course_id={id}
            isOpen={modal1Open}
            setIsOpen={() => setModal1Open(false)}
          />
        </Col>
      )}
    </>
  );
};

export default CourseDiteil;

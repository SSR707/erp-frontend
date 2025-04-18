import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Input, Layout, Menu, Row, theme } from "antd";
// @ts-ignore
import MainLogo from "@/assets/svg/mian.logo.svg";
// @ts-ignore
import SearchIcon from "@/assets/svg/search.icon.svg";
// @ts-ignore
import NotificationIcon from "@/assets/svg/notification.icon.svg";
import { Outlet } from "react-router-dom";
import { menu, menuBootm } from "./components/layout.menu";
import Title from "antd/es/typography/Title";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "var( --oq-rang-1)" }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            textAlign: "center",
            padding: "10px",
            marginBottom: "6px",
            borderTop: "none",
            border: "2px solid var(--stroka-rang-2)",
          }}
        >
          <img src={MainLogo} alt="Logo" style={{ width: "80%" }} />
        </div>
        <Menu
          style={{
            backgroundColor: "var( --oq-rang-1)",
            marginBottom: "438px",
          }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menu}
        />
        <Menu
          style={{
            backgroundColor: "var( --oq-rang-1)",
          }}
          mode="inline"
          selectable={false}
          items={menuBootm}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            height: "80px",
            display: "flex",
            alignItems: "center",
            background: colorBgContainer,
          }}
        >
          <Row
            justify={"space-between"}
            style={{ width: "100%", alignItems: "center" }}
          >
            <Row style={{ width: "full", alignItems: "center", gap: "10px" }}>
              {" "}
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <Input
                style={{
                  maxWidth: "210px",
                  padding: " 6px 60px 6px 15px",
                  border: "1px solid var(--qidiruv-tizimi-1)",
                  borderRadius: "4px",
                  boxShadow: "2px 2px 2px 0 rgba(0, 0, 0, 0.1)",
                  background: "var(--stroka-rang-2)",
                  fontFamily: "var(--font-family)",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
                placeholder="Qidiruv tizimi..."
                prefix={<img width={24} height={24} src={SearchIcon} />}
              />
            </Row>
            <Row
              style={{ gap: "10px", alignItems: "center", marginRight: "20px" }}
            >
              <Button
                type="default"
                shape="circle"
                style={{
                  width: 38,
                  height: 38,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={NotificationIcon} width={24} height={24} alt="" />
              </Button>
              <Avatar src={MainLogo} alt="Logo" size={38} />
              <Col>
                <Title
                  level={3}
                  style={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "var(--matn-rang-1)",
                    fontFamily: "var(--font-family)",
                    margin: 0,
                  }}
                >
                  {" "}
                  Ruslan Mirzaev
                </Title>
                <Title
                  level={4}
                  style={{
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "var(--filter-matn-rang-1)",
                    fontFamily: "var(--font-family)",
                    margin: 0,
                  }}
                >
                  {" "}
                  Foydalanuvchi
                </Title>
              </Col>
            </Row>
          </Row>
        </Header>
        <Content
          style={{
            backgroundColor: "var(--stroka-rang-2)",
            overflowY: "auto",
            height: "calc(100vh - 80px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

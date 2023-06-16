import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  homeIcon,
  logOutIcon,
  productIcon,
  productOrder,
  projectIcon1,
  projectsIcon,
  redTrash,
  serviceIcon,
  serviceOrder,
  subScription,
  userIcon,
} from "../assets";
import "./layout.css";
import Header2 from "../components/header/header";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Products from "../pages/products/products";
import { useDispatch } from "react-redux";
import { accessToken, refreshToken, userData } from "../redux/userDataSlice";
import { useToken } from "antd/es/theme/internal";
import Services from "../pages/services/services";
import AddNewService from "../pages/addNewService/addNewService";
import UpdateService from "../pages/updateService/updateService";
import UserList from "../pages/userList/userList";
import ProductOrder from "../pages/productOrder/productOrder";
import ServiceOrder from "../pages/serviceOrder/serviceOrder";
import { callApi } from "../api/apiCaller";
import routes from "../api/routes";
import { useState } from "react";
import Loader from "../components/loader/loader";
import { GreenNotify, RedNotify } from "../helper/helper";
import SubScription from "../pages/subScription/subScription";
import Dashboard from "../pages/dashboard/dashboard";
import UserProjects from "../pages/userProjects/userProjects";

const { Header, Content, Footer, Sider } = Layout;
const LayoutDashboard = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    let getRes = (res) => {
      if (res.status == 200) {
        GreenNotify(res.message);
        dispatch(userData(null));
        dispatch(accessToken(""));
        dispatch(refreshToken(""));
      } else {
        RedNotify(res.message);
      }
    };

    let body = {
      device: {
        id: localStorage.getItem("deviceId"),
        deviceToken: "xyz",
      },
    };

    callApi("POST", routes.logOut, body, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Loader loading={isloading} />
      <Sider style={{ background: "#0B1B2D" }} width={280}>
        <div
          style={{
            padding: "2rem 0",
            textAlign: "center",
            color: "white",
            fontSize: "3rem",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Cospendium
        </div>
        <Menu
          style={{ marginTop: "5rem" }}
          inlineCollapsed={true}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          // items={itemsMain}
        >
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/user-list")}
            icon={<img className="side-bar-icon" src={userIcon} />}
            key="95"
          >
            Users
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/subscription")}
            icon={<img className="side-bar-icon" src={subScription} />}
            key="96"
          >
            Subscription
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "2rem" }}
            onClick={() => navigate("/userProject")}
            icon={<img className="side-bar-icon" src={projectIcon1} />}
            key="90"
          >
            Projects
          </Menu.Item>

          <Menu.Item
            style={{ marginTop: "5rem" }}
            icon={<img className="side-bar-icon" src={logOutIcon} />}
            onClick={logOut}
            key="89"
          >
            Log Out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header2 />
        <Content
          style={{
            background: "#fff",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            {/* <Route path="/products" element={<Products />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/new-service" element={<AddNewService />}></Route>
            <Route path="/update-service" element={<UpdateService />}></Route> */}
            <Route path="/user-list" element={<UserList />}></Route>
            <Route path="/subscription" element={<SubScription />}></Route>
            <Route path="/userProject" element={<UserProjects />}></Route>
            {/* <Route
              path="/products-order-list"
              element={<ProductOrder />}
            ></Route>
            <Route
              path="/services-order-list"
              element={<ServiceOrder />}
            ></Route> */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;

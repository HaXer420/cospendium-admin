import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Breadcrumb, Button, Select, Table, Image } from "antd";
import {
  freeIcon,
  homeIcon,
  orderIcon1,
  premiumIcon,
  productIcon,
  productIcon1,
  projectsIcon,
  redTrash,
  serviceIcon,
  serviceIcon1,
  userIcon1,
  wishList,
} from "../../assets";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import moment from "moment/moment";
import routes from "../../api/routes";
import { callApi } from "../../api/apiCaller";
import Loader from "../../components/loader/loader";
const Dashboard = () => {
  const [value, setValue] = useState(new Date());
  const [isloading, setIsLoading] = useState(false);
  const [appStats, setAppStats] = useState();

  const stateArr = [
    {
      title: "Total User",
      count: appStats?.allusers,
      icon: userIcon1,
    },
    {
      title: "All Projects",
      count: appStats?.allprojects,
      icon: projectsIcon,
    },
    {
      title: "Active Projects",
      count: appStats?.activeprojects,
      icon: projectsIcon,
    },
    {
      title: "Complete Projects",
      count: appStats?.completedprojects,
      icon: projectsIcon,
    },
    {
      title: "Whish list Projects",
      count: appStats?.whishlistprojects,
      icon: wishList,
    },
    {
      title: "Free User",
      count: appStats?.freeusers,
      icon: freeIcon,
    },
    {
      title: "Premium User",
      count: appStats?.premiumusers,
      icon: premiumIcon,
    },
  ];

  const getStats = () => {
    let getRes = (res) => {
      //console.log("res of get state ", res);
      setAppStats(res);
    };

    callApi("GET", routes.getStats, null, setIsLoading, getRes, (error) => {
      // console.log("error", error);
    });
  };
  const getAllData = () => {
    let getRes = (res) => {
      // console.log("res of get state ", res);
    };

    callApi("GET", routes.getAllData, null, setIsLoading, getRes, (error) => {
      // console.log("error", error);
    });
  };
  useEffect(() => {
    getStats();
    getAllData();
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div className="dashboard-main-container">
        <div className="dashboard-state-container">
          {stateArr.map((item) => (
            <div className="dashboard-state-count-container">
              <div className="dashboard-state-icon">
                <img src={item.icon} alt="icon" />
              </div>
              <div className="dashboard-state">
                <h2>{item.title}</h2>
                <p>{item.count}</p>
              </div>
            </div>
          ))}

          {/* <div className="dashboard-state-count-container"></div> */}
        </div>
        <div className="dashboard-pie-chart-container">
          <Clock size={120} value={value} />
          <p>
            Current time:{" "}
            <span style={{ color: "red", fontWeight: "700" }}>
              {moment(new Date()).format("DD, MMM, YYYY , HH:mm A")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

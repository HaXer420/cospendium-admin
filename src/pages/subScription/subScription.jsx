import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Select, Table, Image } from "antd";
import { crossIcon, homeIcon, redTrash, trueIcon } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import moment from "moment/moment";

const SubScription = () => {
  const [users, setUsers] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const getAllUser = () => {
    let getRes = (res) => {
      //console.log("res of user ", res);
      setUsers(res?.data?.data);
    };

    callApi("GET", routes.getAllUser, null, setIsLoading, getRes, (error) => {
      //console.log("error", error);
    });
  };

  useEffect(() => {
    getAllUser();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      className: "role-name-column-header",
    },

    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      className: "type-name-column-header",
      width: 400,
      // render: (text) => <span style={{ color: "#34ADF4" }}>{text}</span>,
    },
    {
      title: "Created At",
      dataIndex: "created",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Profile Picture",
      dataIndex: "profilePicture",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      align: "center",
      className: "action-column-header",
      filters: [
        {
          text: "Basic",
          value: "Basic",
        },
        {
          text: "Premium",
          value: "Premium",
        },
      ],
      onFilter: (value, record) =>
        record.subscription.props.children.props.children.includes(value),
    },
  ];

  const data = users?.map((item, index) => {
    return {
      key: index,
      firstName: item?.name,
      lastName: item?.lastname,
      email: item?.email,
      created: moment(item?.createdAt).format("MM-DD-YYYY, HH:mm A"),
      profilePicture: (
        <div className="product-list-image">
          <Image width={50} src={item?.image} alt="profile-image" />
        </div>
      ),
      subscription: (
        <div className="server-roles-trash-btn">
          <h1>{item?.isPremium ? "Premium" : "Basic"}</h1>
        </div>
      ),
    };
  });

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };

  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>User List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>User List</h1> <div></div>
      </div>
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={true}
          className="subscriptionapi-table"
        ></Table>
      </div>
    </div>
  );
};

export default SubScription;

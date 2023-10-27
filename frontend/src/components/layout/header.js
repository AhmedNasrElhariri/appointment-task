import React from "react";
import { useEffect, useState } from "react";
import AuthUser from "../functional/auth-user";
import "./layout.css";

import { Layout, theme } from "antd";

const { Header } = Layout;
const Content = () => {
  const [userdetail, setUserdetail] = useState("");
  const { http, token, logout, user } = AuthUser();
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  return (
    <Header className="navbar">
      <div className="logo">
        <a href="/appointments">AppointmentA</a>
      </div>
      <div className="user">
        <img src="/person.jpg" alt="User photo" />
        <span className="name">{user.name}</span>
        <p onClick={logoutUser} className="logout">
          Logout
        </p>
      </div>
    </Header>
  );
};
export default Content;

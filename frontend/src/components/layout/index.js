import SideBar from "./sidebar";
import Header from "./header";
import React from "react";
import Content from "./content";
import Footer from "./footer";
import { Layout } from "antd";
import "../base.css";

const LayoutApp = ({ children }) => {
  return (
    <Layout>
      <SideBar />
      <Layout>
        <Header />
        <Content children={children} />
        <Footer />
      </Layout>
    </Layout>
  );
};
export default LayoutApp;

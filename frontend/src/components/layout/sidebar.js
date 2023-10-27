import React, { useCallback } from "react";

import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { items } from "../../utils/constants";

const { Sider } = Layout;

const SideBar = () => {
  let navigate = useNavigate();
  const handleSelectItem = useCallback(
    ({ item, key }) => {
      switch (key) {
        case "1":
          navigate("/appointments");
          break;
        case "2":
          navigate("/users");
          break;
        case "3":
          navigate("/patients");
          break;
        case "4":
          navigate("/new-appointment");
          break;
        default:
          navigate("/home");
          break;
      }
    },
    [navigate]
  );
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <Menu
        mode="inline"
        theme="dark"
        items={items}
        onSelect={handleSelectItem}
      />
    </Sider>
  );
};
export default SideBar;

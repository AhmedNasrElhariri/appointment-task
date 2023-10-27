import {
  PieChartOutlined,
  ContainerOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Space, Button } from "antd";
export const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

export const rules = [
  {
    required: true,
  },
];

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
export const items = [
  getItem("Appointments", "1", <PieChartOutlined />),
  getItem("Users", "2", <DesktopOutlined />),
  getItem("Patients", "3", <ContainerOutlined />),
  getItem("New Appointment", "4", <ContainerOutlined />),
];

export const patientColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];
export const usersColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
];

export const statuses = ["Archived", "Completed", "Canceled"];

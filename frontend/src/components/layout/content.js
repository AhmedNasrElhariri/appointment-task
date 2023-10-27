import { Layout, theme } from "antd";
import "./layout.css";

const { Content } = Layout;
const ContentPage = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content className="content">
      <div
        className="children-container"
        style={{
          background: colorBgContainer,
        }}
      >
        {children}
      </div>
    </Content>
  );
};
export default ContentPage;

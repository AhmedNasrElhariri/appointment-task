import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card } from "antd";
import React, { useEffect, useState } from "react";
import AuthUser from "../../components/functional/auth-user";
import { rules, formItemLayout } from "../../utils/constants";
import "./style.css";

export default function Register() {
  const { http } = AuthUser();
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = ({ name, username, password }) => {
    http.post("/register", { email: username, password, name }).then((res) => {
      navigate("/login");
    });
  };

  return (
    <div className="register">
      <Card className="card">
        <h1 className="header">Register</h1>
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
          {...formItemLayout}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={rules}
            className="d-block full-width margin-form-item"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ type: "email", required: true }]}
            className="d-block full-width margin-form-item"
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={rules}
            style={{
              display: "block",
              width: "100%",
              margin: "10px 0px 30px 0px",
            }}
            className="d-block full-width margin-form-item"
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <div className="submit-button-container">
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !clientReady ||
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                  className="margin-auto mt-20"
                >
                  Register
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
}

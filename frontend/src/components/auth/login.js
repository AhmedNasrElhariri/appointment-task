import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Card, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { usePermify } from "@permify/react-role";
import { getPermissionsOfUser } from "../../utils/helpers";
import { rules } from "../../utils/constants";
import AuthUser from "../../components/functional/auth-user";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const { http, setToken } = AuthUser();
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const { setUser } = usePermify();
  const [recap, setRecap] = useState(null);
  const [showError, setShowError] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = ({ username, password }) => {
    setShowError(false);
    if (recap) {
      http
        .post("/login", { email: username, password: password })
        .then(({ data: { user, access_token } }) => {
          const { permissions, role } = getPermissionsOfUser(user.type);
          setToken(user, access_token);
          setUser({
            id: user.id,
            roles: role,
            permissions,
          });
        })
        .catch((err) => {
          setShowError(true);
        });
    }
  };

  const signUp = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className="register">
      <Card className="card">
        {showError && (
          <Alert
            message="Sorry that password or email isn't right!"
            type="error"
            closable
            showIcon
          />
        )}
        <h1 className="header">Login</h1>
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
        >
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
            className="d-block full-width margin-form-item mb-20"
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <ReCAPTCHA
            sitekey="6Lfg2NIoAAAAAJ_O6h25qRL5Q-klvEI1GJeqQ22D"
            onChange={(val) => setRecap(val)}
            style={{ margin: "20px" }}
          />
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
                  className="margin-auto mt-30"
                >
                  Log in
                </Button>
              )}
            </Form.Item>
          </div>
          <div className="submit-button-container">
            Not a member?{" "}
            <p onClick={signUp} className="primary pointer">
              Signup now
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
}

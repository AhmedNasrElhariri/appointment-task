import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  TimePicker,
  Select,
  Card,
  Alert,
  Spin,
} from "antd";
import { useUsers } from "../../hooks";
import { rules } from "../../utils/constants";
import AuthUser from "../functional/auth-user";
import { HasAccess } from "@permify/react-role";

const NewAppointment = () => {
  const { http, user } = AuthUser();
  const [showAlert, setShowAlert] = useState(false);
  const { users: patients } = useUsers({ type: "patients" });
  const { users: doctors } = useUsers({ type: "doctors" });

  const [date, setDate] = useState(null);

  const handleFinish = ({ doctor_id, patient_id, time, date }) => {
    let finalDate = new Date(date);
    const timeDate = new Date(time);
    finalDate.setHours(timeDate.getHours() + 2); // i added 2 hour because the local is minus 2 than ths standard another solution i use momentjs
    finalDate.setMinutes(timeDate.getMinutes());
    http
      .post("/create-appointment", {
        doctor_id,
        patient_id,
        user_id: user.id,
        date: finalDate,
      })
      .then(({ data }) => {
        setShowAlert(true);
      });
  };
  const handleChangeValues = useCallback((changedValues, { date }) => {
    setDate(date["$d"]);
  }, []);

  const updatedPatients = useMemo(
    () => (user.type == "Patient" ? [user] : patients),
    [user, patients]
  );
  return (
    <HasAccess
      roles={["patient,admin"]}
      permissions="create-appointment"
      renderAuthFailed={
        <Alert message="You are not authorized to access!" type="error" />
      }
      isLoading={<Spin />}
    >
      {showAlert && (
        <Alert
          message="Appointment Created Successfully"
          type="success"
          closable
          showIcon
        />
      )}

      <Card className="card">
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          onFinish={handleFinish}
          onValuesChange={handleChangeValues}
        >
          <Form.Item name="doctor_id" label="Doctor" rules={rules}>
            <Select size="large" allowClear>
              {doctors &&
                doctors.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="patient_id" label="Patient" rules={rules}>
            <Select size="large" allowClear>
              {updatedPatients &&
                updatedPatients.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="DatePicker" name="date" rules={rules}>
            <DatePicker className="full-width" size="large" />
          </Form.Item>
          {date && (
            <Form.Item name="time" label="Time" rules={rules}>
              <TimePicker className="full-width" size="large" format="HH:mm" />
            </Form.Item>
          )}

          <div className="full-width d-flex">
            <Button
              type="primary"
              htmlType="submit"
              style={{ margin: "10px auto" }}
            >
              Create Appointment
            </Button>
          </div>
        </Form>
      </Card>
    </HasAccess>
  );
};
export default NewAppointment;

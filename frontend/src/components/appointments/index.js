import { useCallback, useMemo, useState } from "react";
import { useAppointments } from "../../hooks";
import { Spin, Alert, Button, Space, Table } from "antd";
import { HasAccess } from "@permify/react-role";
import UpdateStatus from "./update-status";
import AuthUser from "../functional/auth-user";

const Appointments = () => {
  const { appointments } = useAppointments({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const { http, user } = AuthUser();
  const [data, setDate] = useState(null);
  const [statusVal, setStatusVal] = useState("Archived");

  const showModal = useCallback(
    (id, status) => {
      setAppointmentId(id);
      setIsModalOpen(true);
      setStatusVal(status);
    },
    [setStatusVal]
  );
  const handleOk = () => {
    http
      .post("/update-appointment-status", {
        appointmentId,
        user_id: user.id,
        type: user.type,
        status: statusVal,
      })
      .then(({ data }) => {
        setDate(data);
        setIsModalOpen(false);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updatedAppointments = useMemo(() => {
    const existedAppointments = data ? data : appointments;
    return existedAppointments.map(
      ({
        doctor: { name: doctorName },
        patient: { name: patientName },
        date: DATE,
        ...rest
      }) => {
        const datetime = new Date(DATE);
        const date = datetime.toLocaleDateString();
        const startTime = datetime.toLocaleTimeString();
        const updatedDateTime = new Date(
          datetime.setHours(datetime.getHours() + 1)
        );
        const endTime = updatedDateTime.toLocaleTimeString();
        return {
          doctorName,
          patientName,
          date,
          startTime,
          endTime,
          ...rest,
        };
      }
    );
  }, [appointments, data]);

  const appointmentsColumns = [
    {
      title: "Patient",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Doctor",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <HasAccess
            roles={["admin,doctor"]}
            permissions="update-appointment-status"
          >
            <Button
              type="primary"
              onClick={() => showModal(record.id, record.status)}
            >
              Change Status
            </Button>
          </HasAccess>
        </Space>
      ),
    },
  ];

  return (
    <HasAccess
      roles={["admin,patient,doctor"]}
      permissions="check-appoitments"
      renderAuthFailed={
        <Alert message="You are not authorized to access!" type="error" />
      }
      isLoading={<Spin />}
    >
      <h1 className="header">Appointments</h1>
      <Table dataSource={updatedAppointments} columns={appointmentsColumns} />
      <UpdateStatus
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        appointmentId={appointmentId}
        statusVal={statusVal}
        setStatusVal={setStatusVal}
      />
    </HasAccess>
  );
};
export default Appointments;

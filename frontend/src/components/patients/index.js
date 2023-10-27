import { useUsers } from "../../hooks";
import { Table } from "antd";
import { Spin, Alert } from "antd";
import { HasAccess } from "@permify/react-role";
import { patientColumns } from "../../utils/constants";

const Patients = () => {
  const { users: patients } = useUsers({ type: "patients" });

  return (
    <HasAccess
      roles={["admin"]}
      permissions="manage-patients"
      renderAuthFailed={
        <Alert message="You are not authorized to access!" type="error" />
      }
      isLoading={<Spin />}
    >
      <h1 className="header">Patients</h1>
      <Table dataSource={patients} columns={patientColumns} />;
    </HasAccess>
  );
};
export default Patients;

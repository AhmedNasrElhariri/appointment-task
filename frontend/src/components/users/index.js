import { useUsers } from "../../hooks";
import { Table } from "antd";
import { Spin, Alert } from "antd";
import { HasAccess } from "@permify/react-role";
import { usersColumns } from "../../utils/constants";

const Users = () => {
  const { users } = useUsers({ type: "users" });

  return (
    <HasAccess
      roles={["admin"]}
      permissions="manage-doctors"
      renderAuthFailed={
        <Alert message="You are not authorized to access!" type="error" />
      }
      isLoading={<Spin />}
    >
      <h1 className="header">Users</h1>
      <Table dataSource={users} columns={usersColumns} />;
    </HasAccess>
  );
};
export default Users;

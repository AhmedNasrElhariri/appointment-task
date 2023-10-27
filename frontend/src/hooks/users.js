import { useEffect, useState } from "react";
import AuthUser from "../components/functional/auth-user";

const useUsers = ({ type }) => {
  const { http } = AuthUser();
  const [users, setUsers] = useState(null);
  useEffect(() => {
    http.get("/users", { params: { type } }).then(({ data }) => {
      setUsers(data);
    });
  }, [type]);
  return {
    users,
  };
};
export default useUsers;

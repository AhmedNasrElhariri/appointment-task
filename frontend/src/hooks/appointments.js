import { useEffect, useState } from "react";
import AuthUser from "../components/functional/auth-user";

const useAppointments = () => {
  const { http, user } = AuthUser();
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    http
      .get("/appointments", { params: { user_id: user.id, type: user.type } })
      .then(({ data }) => {
        setAppointments(data);
      });
  }, []);
  return {
    appointments,
  };
};

export default useAppointments;

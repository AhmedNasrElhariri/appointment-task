import { Routes, Route } from "react-router-dom";
import {
  Appointments,
  NewAppointment,
  Patients,
  Users,
  Home,
} from "../../components";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/users" element={<Users />} />
        <Route path="/new-appointment" element={<NewAppointment />} />
      </Routes>
    </div>
  );
};
export default AppRouter;

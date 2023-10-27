import AuthUser from "./components/functional/auth-user";
import Login from "./components/auth/login";
import { Route, Navigate, Routes } from "react-router-dom";
import AppLayout from "./components/layout";
import AppRouter from "./components/router";
import { Fragment } from "react";
import Register from "./components/auth/register";
import { PermifyProvider } from "@permify/react-role";

function App() {
  const { getToken } = AuthUser();

  return (
    <PermifyProvider>
      <Fragment>
        {!getToken() ? (
          <Fragment>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Fragment>
        ) : (
          <AppLayout>
            <AppRouter></AppRouter>
          </AppLayout>
        )}
      </Fragment>
    </PermifyProvider>
  );
}

export default App;

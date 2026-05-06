import { Navigate, Outlet } from "react-router";

const ProtectorRutas = () => {

  if (!false) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectorRutas;
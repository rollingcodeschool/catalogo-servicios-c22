import { Navigate, Outlet } from "react-router";
import { useAppContext } from "../../context/AppContext";

const ProtectorRutas = () => {
  const { usuarioLogueado, loadingSession } = useAppContext();

  if (loadingSession) {
    return null;
  }

  if (!usuarioLogueado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectorRutas;
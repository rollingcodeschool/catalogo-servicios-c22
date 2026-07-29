import Administrador from "./components/pages/Administrador";
import Inicio from "./components/pages/Inicio";
import DetalleServicio from "./components/pages/DetalleServicio";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import Error404 from "./components/pages/Error404";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/pages/Login";
import FormularioServicio from "./components/pages/FormularioServicio";
import ProtectorRutas from "./components/routes/ProtectorRutas";
import { useEffect, useState } from "react";
import { AppContext, type Usuario } from "./context/AppContext";
import {
  loginBackendApi,
  logoutBackendApi,
  obtenerPerfilApi,
  verificarPerfilApi,
} from "./helpers/queries";

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(null);
  const [loadingSession, setLoadingSession] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      const res = await verificarPerfilApi();

      if (res.ok) {
        const data: Usuario = await res.json();
        setUsuarioLogueado(data);
        return;
      }

      if (res.status === 401 || res.status === 403) {
        setUsuarioLogueado(null);
        return;
      }

      setUsuarioLogueado(null);
    } catch (error) {
      if (error instanceof Error && error.message !== "Failed to fetch") {
        console.error("Error al verificar la sesión:", error);
      }
      setUsuarioLogueado(null);
    } finally {
      setLoadingSession(false);
    }
  };

  const loginBackend = async (email: string, pass: string): Promise<Usuario | null> => {
    setLoadingSession(true);

    try {
      const loginRes = await loginBackendApi(email, pass);
      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        throw new Error(loginData?.mensaje || "No se pudo iniciar sesión");
      }

      const perfil = await obtenerPerfilApi();
      setUsuarioLogueado(perfil);
      return perfil;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setUsuarioLogueado(null);
      throw error;
    } finally {
      setLoadingSession(false);
    }
  };

  const logoutBackend = async () => {
    try {
      await logoutBackendApi();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUsuarioLogueado(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AppContext.Provider
      value={{
        usuarioLogueado,
        loadingSession,
        setUsuarioLogueado,
        loginBackend,
        logoutBackend,
      }}
    >
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <Menu></Menu>
        <main className="grow container mx-auto my-4 px-4 py-8">
          <Routes>
            <Route path="/" element={<Inicio></Inicio>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/detalle-servicio/:id" element={<DetalleServicio></DetalleServicio>}></Route>
            <Route path="/administrador" element={<ProtectorRutas/>}>
              <Route index element={<Administrador/>}/>
              <Route path="crear" element={<FormularioServicio titulo={'Crear Servicio'}></FormularioServicio>}/>
              <Route path="editar/:id" element={<FormularioServicio titulo={'Editar Servicio'}></FormularioServicio>}/>
            </Route>
            <Route path="*" element={<Error404></Error404>}></Route>
          </Routes>
        </main>
        <Footer></Footer>
      </div>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

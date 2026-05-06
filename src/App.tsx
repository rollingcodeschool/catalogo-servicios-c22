import Administrador from "./components/pages/Administrador";
import Inicio from "./components/pages/Inicio";
import DetalleServicio from "./components/pages/DetalleServicio";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import Error404 from "./components/pages/Error404";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/pages/Login";
import FormularioServicio from "./components/pages/FormularioServicio";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <Menu></Menu>
        <main className="grow container mx-auto my-4 px-4 py-8">
          <Routes>
            <Route path="/" element={<Inicio></Inicio>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/detalle-servicio" element={<DetalleServicio></DetalleServicio>}></Route>
            <Route path="/administrador" element={<Administrador></Administrador>}></Route>
            <Route path="/administrador/crear" element={<FormularioServicio titulo='Crear servicio'/>}></Route>
            <Route path="/administrador/editar" element={<FormularioServicio titulo='Editar servicio'/>}></Route>
            <Route path="*" element={<Error404></Error404>}></Route>
          </Routes>
        </main>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

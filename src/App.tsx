import Administrador from "./components/pages/Administrador"
import Inicio from "./components/pages/Inicio"
import Footer from "./components/shared/Footer"
import Menu from "./components/shared/Menu"
import Error404 from './components/pages/Error404';


function App() {


  return (
     <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* <Menu></Menu> */}
      {/* <Inicio></Inicio> */}
      {/* <Administrador></Administrador> */}
      <Error404></Error404>
      <Footer></Footer>
     </div>
  )
}

export default App

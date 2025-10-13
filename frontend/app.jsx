import "./styles/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas principales
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotasList from "./pages/notas/NotasList";
import NotaCreate from "./pages/notas/NotaCreate";
import NotaEdit from "./pages/notas/NotaEdit";
import Etiquetas from "./pages/Etiquetas";
import Usuarios from "./pages/Usuarios";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      {/* Contenedor de notificaciones */}
      <ToastContainer />

      {/* Barra superior persistente */}
      <Navbar />

      {/* Contenido principal */}
      <main className="contenido">
        <Routes>
          {/* Página de inicio (sin login) */}
          <Route path="/" element={<Home />} />

          {/* Autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Página principal de notas */}
          <Route path="/notas" element={<NotasList />} />
          <Route path="/notas/crear" element={<NotaCreate />} />
          <Route path="/notas/editar/:id" element={<NotaEdit />} />

          {/* Etiquetas y usuarios */}
          <Route path="/etiquetas" element={<Etiquetas />} />
          <Route path="/usuarios" element={<Usuarios />} />

          {/* Página de error */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Pie de página */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;

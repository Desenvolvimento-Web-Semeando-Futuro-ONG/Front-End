import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Publicacao from "./pages/Publicacao/publicacao";
import Judo from "./pages/Projetos/projetojudo";
import ProjetoIdosos from "./pages/Projetos/projetoidosos";
import ProjetoEventos from "./pages/Projetos/projetoeventos";
import ProjetoRecreativas from "./pages/Projetos/projetorecreativas";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publicacao" element={<Publicacao />} />
        <Route path="/projeto-judo" element={<Judo />} />
        <Route path="/projetos/idosos" element={<ProjetoIdosos />} />
        <Route path="/projetos/eventos" element={<ProjetoEventos />} />
        <Route path="/projetos/recreativa" element={<ProjetoRecreativas />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

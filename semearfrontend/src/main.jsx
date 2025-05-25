import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Publicacao from "./pages/Publicacao/publicacao";
import Judo from "./pages/Projetos/projetojudo";
import Evento from "./pages/Evento/evento";
import TelaInicial from "./pages/TelaInicial/telainicial";
import ConfiguracoesAdm from "./pages/configuracao/configuracao";
import Voluntarios from "./pages/Voluntarios/voluntarios";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publicacao" element={<Publicacao />} />
        <Route path="/projeto-judo" element={<Judo />} />
        <Route path="/evento/:id" element={<Evento />} />
        <Route path="/telainicial" element={<TelaInicial />} />
        <Route path="/voluntarios" element={<Voluntarios />} />
        <Route path="/configuracao" element={<ConfiguracoesAdm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
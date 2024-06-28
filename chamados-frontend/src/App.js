import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import IncluirChamado from './components/IncluirChamado/IncluirChamado';
import ConsultaChamados from './components/ConsultaChamados/ConsultaChamados';
import ConsultaChamadoEspecifico from './components/ConsultaChamadoEspecifico/ConsultaChamadoEspecifico';


function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/incluir-chamado" element={<IncluirChamado />} />
          <Route path="/consulta-chamados" element={<ConsultaChamados />} />
          <Route path="/consulta-chamado-especifico" element={<ConsultaChamadoEspecifico />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;

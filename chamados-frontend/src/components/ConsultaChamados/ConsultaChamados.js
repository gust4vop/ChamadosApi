import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ConsultaChamados.css';

const ConsultaChamados = () => {
    const [chamados, setChamados] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarChamados = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Usuário não autenticado');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5216/api/chamados', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setChamados(response.data);
            } catch (error) {
                console.error('Erro ao carregar os chamados:', error);
            }
        };

        carregarChamados();
    }, [navigate]);

    return (
        <div className="consulta-chamados-container">
            <h2>Lista de Chamados</h2>
            <ul>
                {chamados.map(chamado => (
                    <li key={chamado.id}>
                        <div>
                            <p><strong>ID:</strong> {chamado.id}</p>
                            <p><strong>Descrição:</strong> {chamado.descricao}</p>
                            <p><strong>Status:</strong> {chamado.status}</p>
                            <p><strong>Data de Abertura:</strong> {new Date(chamado.dataCriacao).toLocaleDateString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/incluir-chamado')}>Incluir Chamado</button>
            <button onClick={() => navigate('/consulta-chamado-especifico')}>Consultar chamado</button>
        </div>
    );
};

export default ConsultaChamados;

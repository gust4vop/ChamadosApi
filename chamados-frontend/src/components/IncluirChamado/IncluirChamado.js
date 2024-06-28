import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './IncluirChamado.css';

const IncluirChamado = () => {
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('Em aberto'); // Ajustado para 'Em aberto' conforme o valor do select
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleIncluirChamado = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Usuário não autenticado');
            navigate('/login');
            return;
        }

        try {
            const dataAtual = new Date().toISOString(); 
            await axios.post('http://localhost:5216/api/chamados', {
                descricao: descricao,
                status: status,
                dataCriacao: dataAtual 
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/consulta-chamados'); 
        } catch (error) {
            setError('Erro ao incluir o chamado');
            console.error('Erro ao incluir o chamado:', error);
        }
    };

    return (
        <div className="incluir-chamado-container">
            <h2>Incluir Chamado</h2>
            <form onSubmit={handleIncluirChamado}>
                <label>Descrição:</label>
                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />
                <br />
                <label>Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="Em aberto">Em aberto</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
                <br />
                <button type="submit">Incluir</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default IncluirChamado;

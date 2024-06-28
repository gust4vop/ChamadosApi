import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ConsultaChamadoEspecifico.css';

const ConsultaChamadoEspecifico = () => {
    const [id, setId] = useState('');
    const [chamado, setChamado] = useState(null);
    const [novoStatus, setNovoStatus] = useState('Em aberto');
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Usuário não autenticado');
            navigate('/login');
        }
    }, [navigate]);

    const handleConsultar = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Usuário não autenticado');
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5216/api/chamados/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setChamado(response.data);
            setEditMode(false); // Garante que o modo de edição seja desativado ao consultar um novo chamado
        } catch (error) {
            setError('Erro ao consultar o chamado');
            console.error('Erro ao consultar o chamado:', error);
        }
    };

    const handleAlterar = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Usuário não autenticado');
            navigate('/login');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5216/api/chamados/${id}`, {
                descricao: chamado.descricao,
                status: novoStatus,
                id: chamado.id,
                dataCriacao: chamado.dataCriacao
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setChamado(response.data);
            setEditMode(false); 
            navigate('/consulta-chamados')
        } catch (error) {
            setError('Erro ao alterar o chamado');
            console.error('Erro ao alterar o chamado:', error);
        }
    };

    return (
        <div className="consulta-chamado-especifico-container">
            <h2>Consultar Chamado Específico</h2>
            <form onSubmit={handleConsultar}>
                <label>ID do Chamado:</label>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
                <button type="submit">Consultar</button>
            </form>
            {chamado && (
                <div className="chamado-detalhes">
                    <h3>Detalhes do Chamado</h3>
                    <p><strong>Descrição:</strong> {chamado.descricao}</p>
                    <p><strong>Status:</strong> {chamado.status}</p>
                    <p><strong>Data de Abertura:</strong> {new Date(chamado.dataCriacao).toLocaleDateString()}</p>

                    {!editMode ? (
                        <button onClick={() => setEditMode(true)}>Alterar Status</button>
                    ) : (
                        <div>
                            <label>Status:</label>
                            <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)}>
                                <option value="Em aberto">Em aberto</option>
                                <option value="Concluído">Concluído</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                            <br />
                            <button onClick={handleAlterar}>Salvar Alterações</button>
                        </div>
                    )}
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default ConsultaChamadoEspecifico;

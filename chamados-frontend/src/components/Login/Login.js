import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5216/api/autenticacao/login', {
                email: email,
                senha: senha
            });

            localStorage.setItem('token', response.data.token);

            navigate('/consulta-chamados');
        } catch (error) {
            setError('Email ou senha inválidos');
            console.error('Erro de login:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <label>Senha:</label>
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;

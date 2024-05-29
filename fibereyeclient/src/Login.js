import React, { useState } from 'react';
import { login } from './axiosConfig';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { access, is_staff } = await login(username, password);
           
            localStorage.setItem('token', access); // Almacena el token
            setMessage('Login successful');
            // Redirige a la página que desees después del inicio de sesión que el rol permita
            if (is_staff) {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error logging in');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
};

export default Login;

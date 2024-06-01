import React, { useState } from 'react';
import { login } from './axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { access, is_staff } = await login(username, password);
            localStorage.setItem('username', username);
            localStorage.setItem('token', access);
            setMessage('Login successful');
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
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/transparentFiberEyelogo.png" alt="FiberEye" />       
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                    {message && <Alert severity={message === 'Login successful' ? 'success' : 'error'}>{message}</Alert>}
                    <Typography variant="body2" align="center">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;

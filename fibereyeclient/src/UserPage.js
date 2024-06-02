import React, { useState, useEffect } from 'react';
import { get_companies, get_tanks, get_sensors, get_readings } from './axiosConfig';
import { Box, Button, Container, Grid, Card, CardContent, CardMedia, Typography, Alert, TextField, Dialog, DialogTitle, DialogContent, Menu, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const [message, setMessage] = useState('');
    const [companies, setCompanies] = useState([]);
    const [tanks, setTanks] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [selectedTank, setSelectedTank] = useState(null);
    const [sensors, setSensors] = useState([]);
    const [sensorReadings, setSensorReadings] = useState([]);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Assume we store username in localStorage upon login
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, []);

    const handleGetCompanies = async () => {
        try {
            const response = await get_companies();
            setCompanies(response);
            setMessage('Companies retrieved successfully');
        } catch (error) {
            setMessage('Error getting companies');
        }
    };

    const handleGetTanks = async () => {
        try {
            const response = await get_tanks(companyId); 
            setTanks(response);
            setMessage('Tanks retrieved successfully');
        } catch (error) {
            setMessage('Error getting tanks');
        }
    };

    const handleOpenSensorDialog = async (tankId) => {
        try {
            const response = await get_sensors(tankId);
            setSensors(response || []);
            setSelectedTank(tankId);
            setOpen(true);
        } catch (error) {
            console.error(error);
            setMessage('Error getting sensors');
        }
    };

    const handleGetReadings = async (sensorId) => {
        try {
            const response = await get_readings(sensorId);
            setSensorReadings(response || []);
        } catch (error) {
            console.error(error);
            setMessage('Error getting sensor readings');
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSensors([]);
        setSensorReadings([]);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                <img src="/transparentFiberEyelogo.png" alt="FiberEye" style={{ width: '50px' }} />
            </Box>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                <Button color="inherit" onClick={handleMenuOpen}>
                    {username}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </Menu>
            </Box>
            <Typography variant="h4" align="center" gutterBottom>
                User Page
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
                <Button variant="contained" onClick={handleGetCompanies}>Get Companies</Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Company ID"
                        variant="outlined"
                        size="small"
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                        sx={{ mr: 2 }}
                    />
                    <Button variant="contained" onClick={handleGetTanks}>Get Tanks by Company</Button>
                </Box>
            </Box>
            {message && <Alert severity={message.includes('successfully') ? 'success' : 'error'}>{message}</Alert>}
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Companies
                    </Typography>
                    {companies.length > 0 ? (
                        companies.map(company => (
                            <Card key={company.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{company.name}</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <Typography variant="body2" color="text.secondary">
                                                ID: {company.id}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Address: {company.address}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Phone: {company.phone}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Email: {company.email}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Tanks: {company.tank_count}
                                            </Typography>
                                        </Grid>
                                        {company.imagen && (
                                            <Grid item xs={4}>
                                                <CardMedia
                                                    component="img"
                                                    image={company.imagen}
                                                    alt={company.name}
                                                    sx={{ border: '1px solid #ddd', 
                                                        borderRadius: '4px', 
                                                        padding: '4px',
                                                        width: '150px',
                                                        height: '150px' 
                                                    }}
                                                />
                                            </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No companies available.</Typography>
                    )}
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Tanks
                    </Typography>
                    {tanks.length > 0 ? (
                        tanks.map(tank => (
                            <Card key={tank.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <Typography variant="h6">{tank.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Capacity: {tank.capacity} liters
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Material: {tank.material}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Location: {tank.location}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Install Date: {tank.install_date}
                                            </Typography>
                                            <Button variant="contained" size="small" onClick={() => handleOpenSensorDialog(tank.id)}>
                                                View Sensors
                                            </Button>
                                        </Grid>
                                        {tank.imagen && (
                                            <Grid item xs={4}>
                                                <CardMedia
                                                    component="img"
                                                    image={tank.imagen}
                                                    alt={tank.name}
                                                    sx={{ border: '1px solid #ddd', 
                                                        borderRadius: '4px', 
                                                        padding: '4px',
                                                        width: '150px',
                                                        height: '150px' 
                                                    }}
                                                />
                                            </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No tanks available.</Typography>
                    )}
                </Grid>

            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Sensors</DialogTitle>
                <DialogContent>
                    {Array.isArray(sensors) && sensors.length > 0 ? (
                        sensors.map(sensor => (
                            <Card key={sensor.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">Sensor Model: {sensor.model}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ID: {sensor.id}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Type: {sensor.type}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Install Date: {sensor.install_date}
                                    </Typography>
                                    <Button variant="contained" size="small" onClick={() => handleGetReadings(sensor.id)}>
                                        View Readings
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No sensors available for this tank.</Typography>
                    )}
                    {Array.isArray(sensorReadings) && sensorReadings.length > 0 && (
                        <div>
                            <Typography variant="h6">Sensor Readings</Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={sensorReadings}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default UserPage;
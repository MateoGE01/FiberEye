import React, { useState, useEffect } from 'react';
import { addcompany, delete_company, add_tank, get_companies, get_tanks, delete_tank, get_sensors, get_readings, add_sensor } from './axiosConfig';
import { Box, Button, Container, Grid, Card, CardContent, CardMedia, Typography, Alert, TextField, Dialog, DialogTitle, DialogContent, Menu, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';


const AdminPage = () => {
    const [message, setMessage] = useState('');
    const [companies, setCompanies] = useState([]);
    const [tanks, setTanks] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [tankId, setTankId] = useState('');
    const [newCompany, setNewCompany] = useState({ name: '', address: '', phone: '', email: '' });
    const [newTank, setNewTank] = useState({ company_id: '', name: '', capacity: '', material: '', location: '', install_date: '' });
    const [sensors, setSensors] = useState([]);
    const [sensorReadings, setSensorReadings] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedTank, setSelectedTank] = useState(null);
    const [newSensor, setNewSensor] = useState({ tank_id: '', model: '', type: '', install_date: '' });
    const [anchorEl, setAnchorEl] = useState(null);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Assume we store username in localStorage upon login
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, []);

    const handleAddCompany = async () => {
        try {
            const response = await addcompany(newCompany.name, newCompany.address, newCompany.phone, newCompany.email);
            setMessage('Company added successfully');
            setNewCompany({ name: '', address: '', phone: '', email: '' });
        } catch (error) {
            console.error(error);
            setMessage('Error adding company');
        }
    };

    const handleDeleteCompany = async () => {
        try {
            const response = await delete_company(companyId);
            setMessage('Company deleted successfully');
            setCompanyId('');
        } catch (error) {
            console.error(error);
            setMessage('Error deleting company');
        }
    };

    const handleAddTank = async () => {
        try {
            const response = await add_tank(newTank.company_id, newTank.name, newTank.capacity, newTank.material, newTank.location, newTank.install_date);
            setMessage('Tank added successfully');
            setNewTank({ company_id: '', name: '', capacity: '', material: '', location: '', install_date: '' });
        } catch (error) {
            console.error(error);
            setMessage('Error adding tank');
        }
    };

    const handleDeleteTank = async () => {
        try {
            const response = await delete_tank(companyId, tankId);
            setMessage('Tank deleted successfully');
            setTankId('');
        } catch (error) {
            console.error(error);
            setMessage('Error deleting tank');
        }
    };

    const handleGetCompanies = async () => {
        try {
            const response = await get_companies();
            setCompanies(response);
        } catch (error) {
            console.error(error);
            setMessage('Error getting companies');
        }
    };

    const handleGetTanks = async () => {
        try {
            const response = await get_tanks(companyId);
            setTanks(response);
            setMessage('Tanks retrieved successfully');
        } catch (error) {
            console.error(error);
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

    const handleAddSensor = async () => {
        try {
            const response = await add_sensor(newSensor.tank_id, newSensor.model, newSensor.type, newSensor.install_date);
            setMessage('Sensor added successfully');
            setNewSensor({ tank_id: '', model: '', type: '', install_date: '' });
        } catch (error) {
            console.error(error);
            setMessage('Error adding sensor');
        }
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
                Admin Page
            </Typography>
            {message && <Alert severity={message.includes('successfully') ? 'success' : 'error'}>{message}</Alert>}

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Admin Actions
                    </Typography>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Add Company</Typography>
                            <TextField
                                label="Name"
                                variant="outlined"
                                size="small"
                                value={newCompany.name}
                                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <TextField
                                label="Address"
                                variant="outlined"
                                size="small"
                                value={newCompany.address}
                                onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <TextField
                                label="Phone"
                                variant="outlined"
                                size="small"
                                value={newCompany.phone}
                                onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                size="small"
                                value={newCompany.email}
                                onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <Button variant="contained" onClick={handleAddCompany}>Add Company</Button>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Delete Company</Typography>
                            <TextField
                                label="Company ID"
                                variant="outlined"
                                size="small"
                                value={companyId}
                                onChange={(e) => setCompanyId(e.target.value)}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <Button variant="contained" onClick={handleDeleteCompany}>Delete Company</Button>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Add Tank</Typography>
                            <TextField
                                label="Company ID"
                                variant="outlined"
                                size="small"
                                value={newTank.company_id}
                                onChange={(e) => setNewTank({ ...newTank, company_id: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <TextField
                                label="Name"
                                variant="outlined"
                                size="small"
                                value={newTank.name}
                                onChange={(e) => setNewTank({ ...newTank, name: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <TextField
                                label="Capacity"
                                variant="outlined"
                                size="small"
                                value={newTank.capacity}
                                onChange={(e) => setNewTank({ ...newTank, capacity: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <TextField
                                label="Material"
                                variant="outlined"
                                size="small"
                                value={newTank.material}
                                onChange={(e) => setNewTank({ ...newTank, material: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <TextField
                                label="Location"
                                variant="outlined"
                                size="small"
                                value={newTank.location}
                                onChange={(e) => setNewTank({ ...newTank, location: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <TextField
                                label="Install Date"
                                variant="outlined"
                                size="small"
                                value={newTank.install_date}
                                onChange={(e) => setNewTank({ ...newTank, install_date: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <Button variant="contained" onClick={handleAddTank}>Add Tank</Button>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Add Sensor</Typography>
                            <TextField
                                label="Tank ID"
                                variant="outlined"
                                size="small"
                                value={newSensor.tank_id}
                                onChange={(e) => setNewSensor({ ...newSensor, tank_id: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            /> 
                            <TextField
                                label="Model"
                                variant="outlined"
                                size="small"
                                value={newSensor.model}
                                onChange={(e) => setNewSensor({ ...newSensor, model: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <TextField
                                label="Type"
                                variant="outlined"
                                size="small"
                                value={newSensor.type}
                                onChange={(e) => setNewSensor({ ...newSensor, type: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <TextField
                                label="Install Date"
                                variant="outlined"
                                size="small"
                                value={newSensor.install_date}
                                onChange={(e) => setNewSensor({ ...newSensor, install_date: e.target.value })}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <Button variant="contained" onClick={handleAddSensor}>Add Sensor</Button> 
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Delete Tank</Typography>
                            <TextField
                                label="Company ID"
                                variant="outlined"
                                size="small"
                                value={companyId}
                                onChange={(e) => setCompanyId(e.target.value)}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <TextField
                                label="Tank ID"
                                variant="outlined"
                                size="small"
                                value={tankId}
                                onChange={(e) => setTankId(e.target.value)}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <Button variant="contained" onClick={handleDeleteTank}>Delete Tank</Button>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Get Companies</Typography>
                            <Button variant="contained" onClick={handleGetCompanies}>Get Companies</Button>
                            {companies.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1">Companies</Typography>
                                    {companies.map((company) => (
                                        <Card key={company.id} sx={{ mb: 2 }}>
                                            <CardContent>
                                                <Typography variant="body1">ID: {company.id}</Typography>
                                                <Typography variant="body1">Name: {company.name}</Typography>
                                                <Typography variant="body1">Address: {company.address}</Typography>
                                                <Typography variant="body1">Phone: {company.phone}</Typography>
                                                <Typography variant="body1">Email: {company.email}</Typography>
                                                <Typography variant="body1">Tanks: {company.tank_count}</Typography>
                                                {company.imagen && (
                                                    <CardMedia
                                                        component="img"
                                                        alt="Company Logo"
                                                        height="140"
                                                        image={company.imagen}
                                                    />
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Get Tanks</Typography>
                            <TextField
                                label="Company ID"
                                variant="outlined"
                                size="small"
                                value={companyId}
                                onChange={(e) => setCompanyId(e.target.value)}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <Button variant="contained" onClick={handleGetTanks}>Get Tanks</Button>
                            {tanks.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1">Tanks:</Typography>
                                    {tanks.map((tank) => (
                                        <Card key={tank.id} sx={{ mb: 2 }}>
                                            <CardContent>
                                                <Typography variant="body1">ID: {tank.id}</Typography>
                                                <Typography variant="body1">Company ID: {tank.company_id}</Typography>
                                                <Typography variant="body1">Name: {tank.name}</Typography>
                                                <Typography variant="body1">Capacity: {tank.capacity}</Typography>
                                                <Typography variant="body1">Material: {tank.material}</Typography>
                                                <Typography variant="body1">Location: {tank.location}</Typography>
                                                <Typography variant="body1">Install Date: {tank.install_date}</Typography>
                                                {tank.imagen && (
                                                    <CardMedia
                                                        component="img"
                                                        alt="Tank Image"
                                                        sx = {{ width: 150, height: 150, mr: 2 }}
                                                        image={tank.imagen}
                                                    />
                                                )}
                                                <Button variant="contained" onClick={() => handleOpenSensorDialog(tank.id)}>View Sensors</Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                <DialogTitle>Sensors for Tank {selectedTank}</DialogTitle>
                <DialogContent>
                    {sensors.length > 0 ? (
                        sensors.map(sensor => (
                            <Card key={sensor.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="body1">Sensor ID: {sensor.id}</Typography>
                                    <Typography variant="body1">Name: {sensor.name}</Typography>
                                    <Typography variant="body1">Type: {sensor.type}</Typography>
                                    <Typography variant="body1">Tank ID: {sensor.tank_id}</Typography>
                                    <Button variant="contained" onClick={() => handleGetReadings(sensor.id)}>View Readings</Button>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No sensors available for this tank</Typography>
                    )}

                    {sensorReadings.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>Sensor Readings</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={sensorReadings}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="timestamp" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default AdminPage;
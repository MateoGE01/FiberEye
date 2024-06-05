import React, { useState, useEffect } from 'react';
import { addcompany, delete_company, add_tank, get_companies, get_tanks, delete_tank, get_sensors, get_readings, add_sensor, get_tank } from './axiosConfig';
import { Box, Button, Container, Grid, Card, CardContent, CardMedia, Typography, Alert, TextField, Dialog, DialogTitle, DialogContent, Menu, MenuItem, Divider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [message, setMessage] = useState('');
    const [companies, setCompanies] = useState([]);
    const [tanks, setTanks] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [tankId, setTankId] = useState('');
    const [deleteCompanyId, setDeleteCompanyId] = useState('');
    const [deleteTankId, setDeleteTankId] = useState('');
    const [getTanksCompanyId, setGetTanksCompanyId] = useState('');
    const [newCompany, setNewCompany] = useState({ name: '', address: '', phone: '', email: '' });
    const [newTank, setNewTank] = useState({ company_id: '', name: '', capacity: '', material: '', location: '', install_date: '', imagen: '' });
    const [sensors, setSensors] = useState([]);
    const [sensorReadings, setSensorReadings] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedTank, setSelectedTank] = useState(null);
    const [newSensor, setNewSensor] = useState({ tank_id: '', model: '', type: '', install_date: '' });
    const [anchorEl, setAnchorEl] = useState(null);
    const [username, setUsername] = useState('');
    const [specificTankId, setSpecificTankId] = useState('');
    const [fetchedTank, setFetchedTank] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, []);

    const handleAddCompany = async () => {
        try {
            const response = await addcompany(newCompany.name, newCompany.address, newCompany.phone, newCompany.email, newCompany.imagen);
            setMessage('Company added successfully');
            setNewCompany({ name: '', address: '', phone: '', email: '' });
        } catch (error) {
            console.error(error);
            setMessage('Error adding company');
        }
    };

    const handleDeleteCompany = async () => {
        try {
            const response = await delete_company(deleteCompanyId);
            setMessage('Company deleted successfully');
            setDeleteCompanyId('');
        } catch (error) {
            console.error(error);
            setMessage('Error deleting company');
        }
    };

    const handleAddTank = async () => {
        try {
            const response = await add_tank(newTank.company_id, newTank.name, newTank.capacity, newTank.material, newTank.location, newTank.install_date, newTank.imagen);
            setMessage('Tank added successfully');
            setNewTank({ company_id: '', name: '', capacity: '', material: '', location: '', install_date: '', imagen: '' });
        } catch (error) {
            console.error(error);
            setMessage('Error adding tank');
        }
    };

    const handleDeleteTank = async () => {
        try {
            const response = await delete_tank(deleteCompanyId, deleteTankId);
            setMessage('Tank deleted successfully');
            setDeleteTankId('');
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
            const response = await get_tanks(getTanksCompanyId);
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

    const handleGetSpecificTank = async () => {
        try {
            const response = await get_tank(specificTankId);
            setFetchedTank(response);
            setButtonClicked(true);
        } catch (error) {
            console.error(error);
            setMessage('Error getting specific tank');
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
                <Grid item xs={12} sm={6}>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Add Company</Typography>
                            <TextField
                                label="Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newCompany.name}
                                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Address"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newCompany.address}
                                onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Phone"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newCompany.phone}
                                onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newCompany.email}
                                onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Image URL"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newCompany.imagen}
                                onChange={(e) => setNewCompany({ ...newCompany, imagen: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="contained" onClick={handleAddCompany}>Add Company</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Delete Company</Typography>
                            <TextField
                                label="Company ID"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={deleteCompanyId}
                                onChange={(e) => setDeleteCompanyId(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="contained" onClick={handleDeleteCompany}>Delete Company</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Add Tank</Typography>
                            <TextField
                                label="Company ID"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newTank.company_id}
                                onChange={(e) => setNewTank({ ...newTank, company_id: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newTank.name}
                                onChange={(e) => setNewTank({ ...newTank, name: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Capacity"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newTank.capacity}
                                onChange={(e) => setNewTank({ ...newTank, capacity: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Material"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newTank.material}
                                onChange={(e) => setNewTank({ ...newTank, material: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Location"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newTank.location}
                                onChange={(e) => setNewTank({ ...newTank, location: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Install Date"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newTank.install_date}
                                onChange={(e) => setNewTank({ ...newTank, install_date: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Image URL"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newTank.imagen}
                                onChange={(e) => setNewTank({ ...newTank, imagen: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="contained" onClick={handleAddTank}>Add Tank</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Delete Tank</Typography>
                            <TextField
                                label="Company ID"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={deleteCompanyId}
                                onChange={(e) => setDeleteCompanyId(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Tank ID"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={deleteTankId}
                                onChange={(e) => setDeleteTankId(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="contained" onClick={handleDeleteTank}>Delete Tank</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Add Sensor</Typography>
                            <TextField
                                label="Tank ID"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newSensor.tank_id}
                                onChange={(e) => setNewSensor({ ...newSensor, tank_id: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Model"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newSensor.model}
                                onChange={(e) => setNewSensor({ ...newSensor, model: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Type"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newSensor.type}
                                onChange={(e) =>setNewSensor({ ...newSensor, type: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label=" Install Date"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newSensor.install_date}
                                onChange={(e) => setNewSensor({ ...newSensor, install_date: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="contained" onClick={handleAddSensor}>Add Sensor</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Get Companies</Typography>
                            <Button variant="contained" onClick={handleGetCompanies}>Get Companies</Button>
                            <Divider sx={{ my: 2 }} />
                            <Box>
                                {companies.map((company, index) => (
                                    <Grid container spacing={2} key={index} sx={{ marginBottom: '20px'}}>
                                        <Grid item xs={8}>
                                            <Typography variant="body1">Company ID: {company.id}</Typography>
                                            <Typography variant="body1">Name: {company.name}</Typography>
                                            <Typography variant="body1">Address: {company.address}</Typography>
                                            <Typography variant="body1">Phone: {company.phone}</Typography>
                                            <Typography variant="body1">Email: {company.email}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CardMedia
                                                component="img"
                                                image={company.imagen}
                                                alt={company.name}
                                                sx={{   border: '1px solid #ddd', 
                                                        borderRadius: '4px', 
                                                        padding: '4px',
                                                        width: '150px',
                                                        height: '150px' 
                                                    }}
                                            />
                                        </Grid>
                                    </Grid>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Get Tanks</Typography>
                            <TextField
                                label="Company ID"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={getTanksCompanyId}
                                onChange={(e) => setGetTanksCompanyId(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="contained" onClick={handleGetTanks}>Get Tanks</Button>
                            <Divider sx={{ my: 2 }} />
                            <Box>
                                {tanks.map((tank, index) => (
                                    <Grid container spacing={2} key={index} sx={{ marginBottom: '20px'}}>
                                        <Grid item xs={8}>
                                            <Typography variant="body1">Tank ID: {tank.id}</Typography>
                                            <Typography variant="body1">Name: {tank.name}</Typography>
                                            <Typography variant="body1">Capacity: {tank.capacity}</Typography>
                                            <Typography variant="body1">Material: {tank.material}</Typography>
                                            <Typography variant="body1">Location: {tank.location}</Typography>
                                            <Typography variant="body1">Install Date: {tank.install_date}</Typography>
                                            <Button variant="contained" onClick={() => handleOpenSensorDialog(tank.id)}>View Sensors</Button>
                                        </Grid>
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
                                    </Grid>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Get Specific Tank</Typography>
                        <TextField
                            label="Tank ID"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={specificTankId}
                            onChange={(e) => setSpecificTankId(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" onClick={handleGetSpecificTank}>Get Specific Tank</Button>
                        {fetchedTank && buttonClicked && (
                            <Grid item xs={12} md={6}>
                                <Card key={fetchedTank.id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={8}>
                                                <Typography variant="h6">{fetchedTank.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Tank ID: {fetchedTank.id}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Capacity: {fetchedTank.capacity} liters
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Material: {fetchedTank.material}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Location: {fetchedTank.location}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Install Date: {fetchedTank.install_date}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Company: {fetchedTank.company.name}
                                                </Typography>
                                                <Button variant="contained" size="small" onClick={() => handleOpenSensorDialog(fetchedTank.id)}>
                                                    View Sensors
                                                </Button>
                                            </Grid>
                                            {fetchedTank.imagen && (
                                                <Grid item xs={4}>
                                                    <CardMedia
                                                        component="img"
                                                        image={fetchedTank.imagen}
                                                        alt={fetchedTank.name}
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
                            </Grid>
                        )}
                    </CardContent>
                </Card>
            </Grid>                    
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Sensors</DialogTitle>
                <DialogContent>
                    {sensors.map((sensor, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="body1">Model: {sensor.model}</Typography>
                            <Typography variant="body1">Type: {sensor.type}</Typography>
                            <Typography variant="body1">Install Date: {sensor.install_date}</Typography>
                            <Button variant="contained" onClick={() => handleGetReadings(sensor.id)}>View Readings</Button>
                            <Divider sx={{ my: 2 }} />
                        </Box>
                    ))}
                    {sensorReadings.length > 0 && (
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={sensorReadings}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="timestamp" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default AdminPage;

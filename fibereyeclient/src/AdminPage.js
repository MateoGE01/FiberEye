import React, { useState } from 'react';
import { addcompany, delete_company, add_tank, get_companies, get_tanks, delete_tank } from './axiosConfig';
import { Box, Button, Container, Grid, Card, CardContent, Typography, Alert, TextField } from '@mui/material';

const AdminPage = () => {
    const [message, setMessage] = useState('');
    const [companies, setCompanies] = useState([]);
    const [tanks, setTanks] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [tankId, setTankId] = useState('');
    const [newCompany, setNewCompany] = useState({ name: '', address: '', phone: '', email: '' });
    const [newTank, setNewTank] = useState({ company_id: '', name: '', capacity: '', material: '', location: '', install_date: '' });

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

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                <img src="/transparentFiberEyelogo.png" alt="FiberEye" style={{ width: '50px' }} />
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
                            <Typography variant="h6" gutterBottom>Delete Tank</Typography>
                            <TextField
                                label="Company ID"
                                variant="outlined"
                                size="small"
                                value={companyId}
                                onChange={(e) => setTankId(e.target.value)}
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
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Companies
                    </Typography>
                    <Button variant="contained" onClick={handleGetCompanies} sx={{ mb: 2 }}>Get Companies</Button>
                    {companies.length > 0 ? (
                        companies.map(company => (
                            <Card key={company.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{company.name}</Typography>
                                    {company.image && (
                                        <img src={company.image} alt={company.name} style={{ width: '100%', height: 'auto' }} />
                                    )}
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
                    <TextField
                        label="Company ID"
                        variant="outlined"
                        size="small"
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleGetTanks} sx={{ mb: 2 }}>Get Tanks by Company</Button>
                    {tanks.length > 0 ? (
                        tanks.map(tank => (
                            <Card key={tank.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{tank.name}</Typography>
                                    {tank.image && (
                                        <img src={tank.image} alt={tank.name} style={{ width: '100%', height: 'auto' }} />
                                    )}
                                    <Typography variant="body2" color="text.secondary">
                                        ID: {tank.id}
                                    </Typography>
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
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No tanks available.</Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminPage;

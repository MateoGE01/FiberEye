import React, { useState } from 'react';
import { get_companies, get_tanks } from './axiosConfig';
import { Box, Button, Container, Grid, Card, CardContent, CardMedia, Typography, Alert, TextField } from '@mui/material';

const UserPage = () => {
    const [message, setMessage] = useState('');
    const [companies, setCompanies] = useState([]);
    const [tanks, setTanks] = useState([]);
    const [companyId, setCompanyId] = useState('');

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
            console.log(response);
            setTanks(response);
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
            {message && <Alert severity="error">{message}</Alert>}
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
                                    {company.image && (
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={company.image}
                                            alt={company.name}
                                        />
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
                    {tanks.length > 0 ? (
                        tanks.map(tank => (
                            <Card key={tank.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{tank.name}</Typography>
                                    {tank.image && (
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={tank.image}
                                            alt={tank.name}
                                        />
                                    )}
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

export default UserPage;

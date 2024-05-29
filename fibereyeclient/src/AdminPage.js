import React, { useState } from 'react';
import { addcompany, delete_company, add_tank, get_companies, get_tanks, delete_tank } from './axiosConfig';

const AdminPage = () => {
    const [message, setMessage] = useState('');
    const [companies, setCompanies] = useState([]);
    const [tanks, setTanks] = useState([]);

    const handleAddCompany = async (name, address, phone, email) => {
        try {
            const response = await addcompany(name, address, phone, email);
            setMessage('Company added successfully');
        } catch (error) {
            console.error(error);
            setMessage('Error adding company');
        }
    };

    const handleDeleteCompany = async (companyId) => {
        try {
            const response = await delete_company(companyId);
            setMessage('Company deleted successfully');
        } catch (error) {
            console.error(error);
            setMessage('Error deleting company');
        }
    };

    const handleAddTank = async (company_id, name, capacity, material, location, install_date) => {
        try {
            const response = await add_tank(company_id, name, capacity, material, location, install_date);
            setMessage('Tank added successfully');
        } catch (error) {
            console.error(error);
            setMessage('Error adding tank');
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

    const handleGetTanks = async (company_id) => {
        try {
            const response = await get_tanks(company_id);
            setTanks(response);
        } catch (error) {
            console.error(error);
            setMessage('Error getting tanks');
        }
    };

    const handleDeleteTank = async (tankId) => {
        try {
            const response = await delete_tank(tankId);
            setMessage('Tank deleted successfully');
        } catch (error) {
            console.error(error);
            setMessage('Error deleting tank');
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <button onClick={handleAddCompany}>Add Company</button>
            <button onClick={() => handleDeleteCompany(1)}>Delete Company</button>
            <button onClick={handleAddTank}>Add Tank</button>
            <button onClick={() => handleGetTanks(1)}>Get Tanks by Company</button>
            <button onClick={() => handleDeleteTank(1)}>Delete Tank</button>
            <button onClick={handleGetCompanies}>Get Companies</button>

            {message && <p>{message}</p>}

            <h2>Companies</h2>
            <ul>
                {companies.map(company => (
                    <li key={company.id}>{company.name}</li>
                ))}
            </ul>

            <h2>Tanks</h2>
            <ul>
                {tanks.map(tank => (
                    <li key={tank.id}>{tank.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;

import React, { useState } from 'react';
import { get_companies, get_tanks} from './axiosConfig';

const UserPage = () => {
    const [message, setMessage] = useState('');
    const [companies, setCompanies] = useState([]);
    const [tanks, setTanks] = useState([]);

    const handleGetCompanies = async () => {
        try {
            const response = await get_companies();
            setCompanies(response);
        } catch (error) {
            console.error(error);
            setMessage('Error getting companies');
        }
    };   

    const handleGetTanks = async (companyId) => {
        try {
            const response = await get_tanks(companyId);
            setTanks(response);
        } catch (error) {
            console.error(error);
            setMessage('Error getting tanks');
        }
    };
    

    return (
        <div>
            <h1>User Page</h1>
            <button onClick={handleGetCompanies}>Get Companies</button>
            <button onClick={() => handleGetTanks(1)}>Get Tanks by Company</button>
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

export default UserPage;

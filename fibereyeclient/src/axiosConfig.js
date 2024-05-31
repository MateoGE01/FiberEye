import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Cambia esto según tu configuración
    headers: {
        'Content-Type': 'application/json',
    }
});

//Función para obtener el token de autenticación
export const login = async (username, password) => {
    const response = await instance.post('/api/token/', 
    { username, password });
    return response.data;
}

//Función para registrar un usuario
export const register = async (username, password, email) => {
    const response = await instance.post('/api/InfoTanques/users/register/', 
    { username, password, email });
    return response.data;

}


//Añadir compañia, accion solo para administradores
export const addcompany = async ( name, address, phone, email) => {
    const token = localStorage.getItem('token');
    const response = await instance.post('/api/InfoTanques/companies/add_company/', 
    { name, address, phone, email }, 
    {headers: {Authorization: `Bearer ${token}`}});

    return response.data;
}

//Ver todas las compañias, accion para todos los usuarios
export const get_companies = async () => {
    const token = localStorage.getItem('token');
    const response = await instance.get('/api/InfoTanques/companies/get_companies/', 
    {headers: {Authorization: `Bearer ${token}`}});

    return response.data;
}

//Borrar compañia, accion solo para administradores
export const delete_company = async (company_id) => {
    const token = localStorage.getItem('token');
    const response = await instance.delete(`/api/InfoTanques/companies/delete_company/?company_id=${company_id}`, 
    {headers: {Authorization: `Bearer ${token}`}});

    return response.data;
}

//Añadir tanque, accion solo para administradores
export const add_tank = async(company_id, name, capacity, material, location, install_date) => {
    const token = localStorage.getItem('token');
    const response = await instance.post('/api/InfoTanques/tanks/add_tank/', 
    {company_id, name, capacity, material, location, install_date},
    {headers: {Authorization: `Bearer ${token}`}});

    return response.data;
}

//Ver todos los tanques por compañia, accion para todos los usuarios
export const get_tanks = async (company_id) => {
    const token = localStorage.getItem('token');
    const response = await instance.get(`/api/InfoTanques/tanks/get_tanks_by_company/?company_id=${company_id}`, 
    {headers: {Authorization: `Bearer ${token}`}});

    return response.data;
}


//Borrar tanque, accion solo para administradores
export const delete_tank = async (company_id, tank_id) => {
    const token = localStorage.getItem('token');
    const response = await instance.delete(`/api/InfoTanques/tanks/delete_tank_by_company/?company_id=${company_id}&tank_id=${tank_id}`,
    {headers : {Authorization: `Bearer ${token}`}});

    return response.data;
}

//Función para obtener los sensores de un tanque
export const get_sensors = async (tank_id) => {
    const token = localStorage.getItem('token');
    const response = await instance.get(`/api/InfoTanques/sensors/get_sensors_by_tank/?tank_id=${tank_id}`, 
    {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
}

//Función para obtener los sensores de un tanque
export const get_readings = async (sensor_id) => {
    const token = localStorage.getItem('token');
    const response = await instance.get(`/api/InfoTanques/sensor_readings/get_readings_by_sensor/?sensor_id=${sensor_id}`, 
    {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
}

export default instance;

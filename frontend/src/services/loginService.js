// src/services/loginService.js

import axios from 'axios';

const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8000/api/token/', {
            username,
            password
        });
        return response.data; // Devuelve el token o los datos que necesites
    } catch (error) {
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export default login; // Asegúrate de que estás exportando la función por defecto
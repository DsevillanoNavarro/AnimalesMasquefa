import axios from 'axios';

// URL base para la API de usuarios, tomada de la variable de entorno
const API_URL = `${process.env.REACT_APP_API_URL}/usuarios/`;

// Función para obtener todos los usuarios
const getUsuarios = () => {
  // Realiza una petición GET a /usuarios/ para traer la lista completa
  return axios.get(API_URL);
};

// Función para obtener un usuario específico por su ID
const getUsuario = (id) => {
  // Petición GET a /usuarios/{id}/ para obtener datos del usuario indicado
  return axios.get(`${API_URL}${id}/`);
};

// Función para crear un nuevo usuario
const createUsuario = (usuarioData) => {
  // Usamos FormData para enviar datos, útil si incluimos archivos o para multipart/form-data
  const formData = new FormData();

  // Añadimos los campos del formulario al FormData
  formData.append('username', usuarioData.get('username'));
  formData.append('first_name', usuarioData.get('first_name'));
  formData.append('last_name', usuarioData.get('last_name'));
  formData.append('email', usuarioData.get('email'));
  formData.append('password', usuarioData.get('password'));
  
  // Convertimos 'recibir_novedades' a string 'true' o 'false' para asegurarnos del formato esperado
  formData.append(
    'recibir_novedades',
    usuarioData.get('recibir_novedades') === 'true' || usuarioData.get('recibir_novedades') === true
      ? 'true'
      : 'false'
  );

  // Enviamos la petición POST para crear el usuario con los datos del formulario
  return axios.post(API_URL, formData);
};

// Función para actualizar un usuario existente parcialmente
const updateUsuario = (id, formData) => {
  // Se espera que formData ya esté preparado, puede incluir campos y archivos (multipart/form-data)
  return axios.patch(`${API_URL}${id}/`, formData, {
    headers: {
      // Indicamos que el contenido es multipart/form-data para que el backend lo interprete bien
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Función para eliminar un usuario por su ID
const deleteUsuario = (id) => {
  // Petición DELETE a /usuarios/{id}/ para eliminar ese usuario
  return axios.delete(`${API_URL}${id}/`);
};

// Exportamos todas las funciones para poder usarlas desde otros módulos
export default {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};

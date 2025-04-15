import axios from 'axios';

const API_URL = 'http://localhost:8000/api/animales/';  // URL de tu API

// Función para obtener todos los animales
const getAnimales = () => {
  return axios.get(API_URL);
};

// Función para obtener un animal por su ID
const getAnimal = (id) => {
  return axios.get(`${API_URL}${id}/`);  // Suponiendo que la API usa el formato /api/animales/{id}/
};

// Función para crear un animal
const createAnimal = (animalData) => {
  const formData = new FormData();
  formData.append('nombre', animalData.get("nombre"));
  formData.append('fecha_nacimiento', animalData.get("fecha_nacimiento"));
  formData.append('situacion', animalData.get("situacion"));

  // Si existe una imagen, la agregamos también
  if (animalData.get("imagen")) {
    formData.append('imagen', animalData.get("imagen"));  // Suponiendo que animalData.imagen es un archivo
  }

  // Enviar el FormData, sin especificar Content-Type, ya que el navegador lo maneja automáticamente
  return axios.post(API_URL, formData);
};

// Función para actualizar un animal
const updateAnimal = (id, animalData) => {
  const formData = new FormData();
  // Agregar los datos del animal
  console.log(animalData)
  formData.append('nombre', animalData.get("nombre"));
  formData.append('fecha_nacimiento', animalData.get("fecha_nacimiento"));
  formData.append('situacion', animalData.get("situacion"));

  // Si hay una imagen, agregarla al FormData
  if (animalData.get("imagen")) {
    formData.append('imagen', animalData.get("imagen"));
  }

  // Verificar los datos en el FormData antes de enviarlos
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  // Realizar la solicitud PUT con los datos
  return axios.put(`${API_URL}${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',  // Esto es importante para enviar los datos correctamente
    },
  });
};



// Función para eliminar un animal
const deleteAnimal = (id) => {
  return axios.delete(`${API_URL}${id}/`);
};

export default {
  getAnimales,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};

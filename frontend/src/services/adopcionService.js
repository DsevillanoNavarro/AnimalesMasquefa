// src/services/adopcionService.js

// Importamos axios para hacer peticiones HTTP
import axios from "axios";

// Definimos la URL base de la API para el módulo de adopciones
const API_URL = `${process.env.REACT_APP_API_URL}/adopciones/`;

/**
 * Obtener todas las adopciones desde la API.
 * Se pueden aplicar filtros opcionales (por animal o por usuario).
 * @param {Object} filters - Filtros opcionales (por ejemplo: { usuario: id, animal: id })
 * @returns {Promise<Array>} Lista de adopciones
 */
const getAdopciones = async (filters = {}) => {
  const params = new URLSearchParams(filters);

  const response = await axios.get(`${API_URL}?${params.toString()}`, {
    withCredentials: true, // Necesario para cookies/session
  });

  // Soporte tanto para listas directas como para paginación estilo DRF
  return Array.isArray(response.data)
    ? response.data
    : response.data.results || response.data;
};

/**
 * Obtener adopciones asociadas a un animal concreto.
 * @param {string|number} animalId - ID del animal
 * @returns {Promise<Array>} Lista de adopciones del animal
 */
const getAdopcionesPorAnimal = async (animalId) => {
  return getAdopciones({ animal: animalId });
};

/**
 * Obtener adopciones asociadas a un usuario concreto.
 * @param {string|number} usuarioId - ID del usuario
 * @returns {Promise<Array>} Lista de adopciones del usuario
 */
const getAdopcionesPorUsuario = async (usuarioId) => {
  return getAdopciones({ usuario: usuarioId });
};

/**
 * Crear una nueva adopción enviando datos y archivo PDF (formulario multipart).
 * @param {Object} data - Datos necesarios para crear la adopción
 * @param {string|number} data.animal - ID del animal
 * @param {string|number} data.usuario - ID del usuario
 * @param {File} data.contenidoFile - Archivo PDF (contrato o información)
 * @returns {Promise<Object>} Adopción creada
 */
const crearAdopcion = async ({ animal, usuario, contenidoFile }) => {
  const formData = new FormData();
  formData.append("animal", animal);
  formData.append("usuario", usuario);
  formData.append("contenido", contenidoFile); // PDF u otro documento

  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

  return response.data;
};

/**
 * Actualizar el estado de una adopción específica (aceptada/rechazada).
 * Solo se envía el campo `aceptada` como JSON.
 * @param {string|number} adopcionId - ID de la adopción
 * @param {boolean} nuevoEstado - Nuevo valor del campo `aceptada`
 * @returns {Promise<Object>} Adopción actualizada
 */
const actualizarEstadoAdopcion = async (adopcionId, nuevoEstado) => {
  const response = await axios.patch(
    `${API_URL}${adopcionId}/`,
    { aceptada: nuevoEstado },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return response.data;
};

/**
 * Actualizar datos de una adopción con posible nuevo archivo PDF.
 * Usa formato multipart/form-data para permitir el envío de archivos.
 * @param {string|number} adopcionId - ID de la adopción
 * @param {FormData} formData - Datos nuevos incluyendo (opcionalmente) un nuevo archivo
 * @returns {Promise<Object>} Adopción actualizada
 */
const actualizarAdopcionConPdf = async (adopcionId, formData) => {
  const response = await axios.patch(
    `${API_URL}${adopcionId}/`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );

  return response.data;
};

/**
 * Eliminar una adopción por su ID.
 * @param {string|number} adopcionId - ID de la adopción
 * @returns {Promise<Object>} Respuesta del servidor
 */
const eliminarAdopcion = async (adopcionId) => {
  const response = await axios.delete(`${API_URL}${adopcionId}/`, {
    withCredentials: true,
  });

  return response.data;
};

// Exportamos todas las funciones en un objeto para usarlas fácilmente desde otros módulos
export default {
  getAdopciones,
  getAdopcionesPorAnimal,
  getAdopcionesPorUsuario,
  crearAdopcion,
  actualizarEstadoAdopcion,
  actualizarAdopcionConPdf,
  eliminarAdopcion,
};

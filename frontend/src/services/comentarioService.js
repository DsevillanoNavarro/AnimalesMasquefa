// src/services/comentarioService.js

// Importamos axios para hacer peticiones HTTP
import axios from "axios";

// Importamos una función para obtener información del usuario actual (usada en otras partes del proyecto)
import { fetchCurrentUser } from "./profileService";

// Definimos la URL base de la API para los comentarios
const API_URL = `${process.env.REACT_APP_API_URL}/comentarios/`;

/**
 * Obtener todos los comentarios desde la API.
 * Se pueden pasar filtros opcionales como parámetros (por ejemplo, por usuario o por noticia).
 * @param {Object} filters - Filtros opcionales como { usuario: id, noticia: id }
 * @returns {Promise<Array>} Lista de comentarios
 */
const getComentarios = async (filters = {}) => {
  // Convertimos los filtros a una cadena de consulta URL
  const params = new URLSearchParams(filters);

  // Hacemos una petición GET a la API incluyendo credenciales (cookies)
  const response = await axios.get(`${API_URL}?${params.toString()}`, {
    withCredentials: true,
  });

  // DRF puede devolver los datos directamente o dentro de `results`
  const data = Array.isArray(response.data)
    ? response.data
    : response.data.results || response.data;

  return data;
};

/**
 * Obtener comentarios filtrados por ID de usuario.
 * @param {string|number} usuarioId - ID del usuario
 * @returns {Promise<Array>} Lista de comentarios del usuario
 */
const getComentariosPorUsuario = async (usuarioId) => {
  if (!usuarioId) throw new Error("Usuario requerido");

  // Llama a la función general con el filtro de usuario
  const comments = await getComentarios({ usuario: usuarioId });

  return comments;
};

/**
 * Obtener comentarios de una noticia concreta.
 * @param {string|number} noticiaId - ID de la noticia
 * @returns {Promise<Array>} Lista de comentarios de la noticia
 */
const getComentariosPorNoticia = async (noticiaId) => {
  // Primero obtenemos todos los comentarios
  const all = await getComentarios();

  // Luego filtramos por ID de la noticia
  return all.filter(c => String(c.noticia) === String(noticiaId));
};

/**
 * Crear un nuevo comentario en la base de datos.
 * @param {Object} comentarioData - Objeto con el contenido del comentario
 * @param {string} token - Token JWT para autenticación
 * @returns {Promise<Object>} Comentario creado
 */
const crearComentario = async (comentarioData, token) => {
  const response = await axios.post(API_URL, comentarioData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Autenticación con token
    },
    withCredentials: true,
  });

  return response.data;
};

/**
 * Actualizar un comentario existente.
 * @param {string|number} id - ID del comentario a actualizar
 * @param {Object} comentarioData - Datos a actualizar
 * @returns {Promise<Object>} Comentario actualizado
 */
const actualizarComentario = async (id, comentarioData) => {
  const response = await axios.patch(`${API_URL}${id}/`, comentarioData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return response.data;
};

/**
 * Eliminar un comentario por su ID.
 * @param {string|number} id - ID del comentario a eliminar
 * @returns {Promise<void>}
 */
const eliminarComentario = async (id) => {
  await axios.delete(`${API_URL}${id}/`, { withCredentials: true });
};

// Exportamos todas las funciones como un objeto para usarlas en otros archivos
export default {
  getComentarios,
  getComentariosPorNoticia,
  getComentariosPorUsuario,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
};

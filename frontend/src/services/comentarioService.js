// src/services/comentarioService.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/comentarios/";

/**
 * Obtener comentarios de una noticia
 * @param {number|string} noticiaId
 * @returns {Promise<AxiosResponse>}
 */
const getComentariosPorNoticia = async (noticiaId) => {
  try {
    const response = await axios.get(`${API_URL}?noticia=${noticiaId}`, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error al obtener los comentarios por noticia:", error);
    throw error;
  }
};

/**
 * Obtener comentarios de un usuario
 * @param {number|string} usuarioId
 * @returns {Promise<AxiosResponse>}
 */
const getComentariosPorUsuario = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}?usuario=${usuarioId}`, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error al obtener los comentarios por usuario:", error);
    throw error;
  }
};

/**
 * Crear un nuevo comentario
 * @param {Object} comentarioData
 * @returns {Promise<AxiosResponse>}
 */
const crearComentario = async (comentarioData) => {
  try {
    const response = await axios.post(API_URL, comentarioData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    throw error;
  }
};

/**
 * Actualizar un comentario existente
 * @param {number|string} id
 * @param {Object} comentarioData
 * @returns {Promise<AxiosResponse>}
 */
const actualizarComentario = async (id, comentarioData) => {
    try {
      const response = await axios.patch(`${API_URL}${id}/`, comentarioData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(`Error al actualizar el comentario con ID ${id}:`, error.response?.data || error);
      throw error;
    }
  };
  

/**
 * Eliminar un comentario
 * @param {number|string} id
 * @returns {Promise<AxiosResponse>}
 */
const eliminarComentario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/`, { withCredentials: true });
    return response;
  } catch (error) {
    console.error(`Error al eliminar el comentario con ID ${id}:`, error);
    throw error;
  }
};

export default {
  getComentariosPorNoticia,
  getComentariosPorUsuario,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
};

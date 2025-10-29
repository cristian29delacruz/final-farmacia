import axios from 'axios';

const API_URL = "http://localhost:3001/usuarios";

// GET - Obtener todos los usuarios
export const getUsuarios = () => axios.get(API_URL);

// POST - Crear un nuevo usuario
export const addUsuario = (usuario) => axios.post(API_URL, usuario);

// PUT - Actualizar un usuario existente
export const editarUsuario = (id, usuario) => axios.put(`${API_URL}/${id}`, usuario);

// DELETE - Eliminar un usuario
export const deleteUsuario = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getUsuarios,
  addUsuario,
  editarUsuario,
  deleteUsuario,
};

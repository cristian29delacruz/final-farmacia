import axios from 'axios';

const API_URL = 'http://localhost:3001/usuarios';

export const getUsuarios = () => axios.get(API_URL);

export const addUsuario = (usuario) => axios.post(API_URL, usuario);

export const editUsuario = (id, usuario) => axios.put(`${API_URL}/${id}`, usuario);

export const deleteUsuario = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getUsuarios,
  addUsuario,
  editUsuario,
  deleteUsuario,
};

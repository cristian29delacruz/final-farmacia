import axios from 'axios';

const API_URL = "http://localhost:3001/clientes";

// GET - Obtener todos los clientes
export const getClientes = () => axios.get(API_URL);

// POST - Crear un nuevo cliente
export const addCliente = (cliente) => axios.post(API_URL, cliente);

// PUT - Actualizar un cliente existente
export const editCliente = (id, cliente) => axios.put(`${API_URL}/${id}`, cliente);

// DELETE - Eliminar un cliente
export const deleteCliente = (id) => axios.delete(`${API_URL}/${id}`);
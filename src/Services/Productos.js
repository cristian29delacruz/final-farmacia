import axios from 'axios';

const API_URL = "http://localhost:3001/productos";

// GET - Obtener todos los productos
export const getProductos = () => axios.get(API_URL);

// POST - Crear un nuevo producto
export const addProducto = (producto) => axios.post(API_URL, producto);

// PUT - Actualizar un producto existente
export const editProducto = (id, producto) => axios.put(`${API_URL}/${id}`, producto);

// DELETE - Eliminar un producto
export const deleteProducto = (id) => axios.delete(`${API_URL}/${id}`);
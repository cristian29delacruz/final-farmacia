import axios from 'axios';

const API_URL = "http://localhost:3001/productos";

export const getProductos = () => axios.get(API_URL);

export const addProducto = (producto) => axios.post(API_URL, producto);

export const editProducto = (id, producto) => axios.put(`${API_URL}/${id}`, producto);

export const deleteProducto = (id) => axios.delete(`${API_URL}/${id}`);
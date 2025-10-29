import axios from "axios";

const API_URL = "http://localhost:3001/ventas";

// GET - Obtener todas las ventas
export const getVentas = () => axios.get(API_URL);

// POST - Crear una nueva venta
export const addVenta = (venta) => axios.post(API_URL, venta);

// PUT - Actualizar una venta existente
export const editVenta = (id, venta) => axios.put(`${API_URL}/${id}`, venta);

// DELETE - Eliminar una venta
export const deleteVenta = (id) => axios.delete(`${API_URL}/${id}`);

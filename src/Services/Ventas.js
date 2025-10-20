import axios from "axios";

const API_URL = "http://localhost:3001/ventas";

export const getVentas = () => axios.get(API_URL);

export const addVenta = (venta) => axios.post(API_URL, venta);

export const editVenta = (id, venta) => axios.put(`${API_URL}/${id}`, venta);

export const deleteVenta = (id) => axios.delete(`${API_URL}/${id}`);

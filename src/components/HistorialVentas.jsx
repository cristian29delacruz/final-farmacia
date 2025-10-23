import React from "react";
import "./HistorialVentas.css";

const HistorialVentas = ({ ventas, productos, onCerrar }) => {
  const getProductoNombre = (productoId) => {
    const producto = productos.find((p) => String(p.id) === String(productoId));
    return producto ? producto.nombre : "Desconocido";
  };

  const getTotal = (venta) => {
    if (venta.total !== undefined && venta.total !== null) {
      return Number(venta.total).toFixed(2);
    }
    const producto = productos.find((p) => String(p.id) === String(venta.productoId));
    const precio = producto ? producto.precio : (venta.precio || 0);
    return (venta.cantidad * precio).toFixed(2);
  };

  return (
    <div className="historial-ventas">
        <h2>Historial de Ventas</h2>
        <button onClick={onCerrar}>Cerrar</button>
        <table>
        <thead>
            <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {!ventas || ventas.length === 0 ?  (
            <tr>
                <td colSpan="4">No hay ventas registradas.</td>
            </tr>
            ) : (
            ventas.map((venta) => (
                <tr key={venta.id}>
                <td data-label="Producto">{getProductoNombre(venta.productoId)}</td>
                <td data-label="Cantidad">{venta.cantidad}</td>
                <td data-label="Fecha">{new Date(venta.fecha).toLocaleDateString()}</td>
                <td data-label="Total">${getTotal(venta)}</td>
                </tr>
            ))
            )}
        </tbody>
        </table>
    </div>
    );
}
export default HistorialVentas;
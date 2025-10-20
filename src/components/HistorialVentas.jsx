import React from "react";

const HistorialVentas = ({ alquileres, productos, oncerrar }) => {
  const getProductoNombre = (productoId) => {
    const producto = productos.find((p) => p.id === productoId);
    return producto ? producto.nombre : "Desconocido";
  };

    return (
    <div className="historial-ventas">
        <h2>Historial de Ventas</h2>
        <button onClick={oncerrar}>Cerrar</button>
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
            {ventas.length === 0 ?  (
            <tr>
                <td colSpan="4">No hay ventas registradas.</td>
            </tr>
            ) : (
            ventas.map((venta) => (
                <tr key={venta.id}>
                <td>{getProductoNombre(venta.productoId)}</td>
                <td>{venta.cantidad}</td>
                <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                <td>${(venta.cantidad * venta.precio).toFixed(2)}</td>
                </tr>
            ))
            )}
        </tbody>
        </table>
    </div>
    );
}
export default HistorialVentas;
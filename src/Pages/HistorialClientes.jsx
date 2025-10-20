 import React, {useEffect, useState} from "react";

 const HistorialClientes = ({ clienteId}) => {
    const [historial, setClienteHistorial ] = useState([]);
    const [loading, setloading] = useState([true]);

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                setTimeout(() => {
                    setClienteHistorial([
                        { id: 1, fecha: "2023-10-01", total: 150.00, detalles: [{ producto: "Paracetamol", cantidad: 2, precio: 50.00 }, { producto: "Ibuprofeno", cantidad: 1, precio: 50.00 }] },
                        { id: 2, fecha: "2023-10-15", total: 200.00, detalles: [{ producto: "Amoxicilina", cantidad: 4, precio: 50.00 }] }
                    ]);
                    setloading(false);
                }, 1000);
            } catch (error) {
                console.error("Error al cargar el historial del cliente:", error);
                setloading(false);
            }
        };
        fetchHistorial();
    }, [clienteId]);

    if (loading) {
        return <div>Cargando historial...</div>;
    }
    if (historial.length === 0) {
        return <div>No hay historial de compras para este cliente.</div>;
    }
    return (
        <div>
            <h3>Historial de Compras</h3>
            <ul>
                {historial.map(venta => (
                    <li key={venta.id}>
                        <strong>Fecha:</strong> {venta.fecha} - <strong>Total:</strong> ${venta.total.toFixed(2)}
                        <ul>
                            {venta.detalles.map((item, index) => (
                                <li key={index}>{item.cantidad} x {item.producto} @ ${item.precio.toFixed(2)}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
 }
    export default HistorialClientes;

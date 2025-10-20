import "./TablaVentas.css";

const TablaVentas = ({ ventas, clientes, productos, onEditar, onEliminar }) => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || null;

    const findFlexible = (arr, id) => {
        if (!arr) return null;
        return arr.find(item => {
            if (item == null) return false;

            return String(item.id) === String(id) || String(item.id) === id || item.id == id;
        });
    };

    const getProductoNombre = (productoId, venta) => {
        const producto = findFlexible(productos, productoId);
        if (producto && (producto.nombre || producto.nombre === "")) return producto.nombre;
        if (venta && (venta.productoNombre || venta.nombre)) return venta.productoNombre || venta.nombre;

        return `Producto ${productoId}`;
    };

    const getClienteNombre = (clienteId, venta) => {
        const cliente = findFlexible(clientes, clienteId);
        if (cliente && cliente.nombre) return cliente.nombre;


        if (usuarioLogueado && usuarioLogueado.rol === 'cliente') {
            return usuarioLogueado.nombre || usuarioLogueado.usuario || usuarioLogueado.email;
        }


        if (venta && (venta.clienteNombre || venta.nombre)) return venta.clienteNombre || venta.nombre;


        return `Cliente ${clienteId}`;
    };

    return (
        <table className="tabla-ventas">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {ventas.length === 0 ? (
                    <tr>
                        <td colSpan="6">No hay ventas registradas.</td>
                    </tr>
                ) : (
                    ventas.map((venta) => (
                        <tr key={venta.id}>
                            <td>{getClienteNombre(venta.clienteId, venta)}</td>
                            <td>{getProductoNombre(venta.productoId, venta)}</td>
                            <td>{venta.cantidad}</td>
                            <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                            <td>
                                ${

                                    (venta.total !== undefined && venta.total !== null)
                                        ? Number(venta.total).toFixed(2)
                                        : (() => {
                                            const prod = findFlexible(productos, venta.productoId) || {};
                                            const precio = prod.precio || venta.precio || 0;
                                            return Number((venta.cantidad || 0) * precio).toFixed(2);
                                        })()
                                }
                            </td>
                            <td>
                                <button onClick={() => onEditar(venta)}>Editar</button>
                                <button onClick={() => onEliminar(venta.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
export default TablaVentas;

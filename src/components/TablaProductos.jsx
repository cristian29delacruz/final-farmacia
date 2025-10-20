import "./TablaProductos.css";

const TablaProductos = ({ productos, onEditar, onEliminar }) => {
    return (
        <table className="tabla-productos">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto) => (
                    <tr key={producto.id}>
                        <td>{producto.nombre}</td>
                        <td>{producto.descripcion}</td>
                        <td>${producto.precio.toFixed(2)}</td>
                        <td>{producto.stock}</td>
                        <td>
                            <img
                                src={producto.imagenUrl}
                                alt={producto.nombre}
                                style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                            />
                        </td>
                        <td>
                            <button onClick={() => onEditar(producto)}>Editar</button>
                            <button onClick={() => onEliminar(producto.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default TablaProductos;

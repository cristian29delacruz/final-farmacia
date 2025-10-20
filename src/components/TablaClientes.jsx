import "./TablaClientes.css";

const TablaClientes = ({clientes, onEditar, onEliminar, onVerHistorial }) => {
    return (
    <table className="tabla-clientes">
        <thead>
        <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
        </tr>
        </thead>
        <tbody> 
        {clientes.map((cliente) => (
            <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>
                <button onClick={() => onEditar(cliente)}>Editar</button>
                <button onClick={() => onEliminar(cliente.id)}>Eliminar</button>
                <button onClick={() => onVerHistorial(cliente.id)}>Ver Historial</button>
                </td>
            </tr>
        ))}
        </tbody>    
    </table>
    );
}
export default TablaClientes;
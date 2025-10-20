import { useState, useEffect } from "react";

const FormVentas = ({ onGuardar, ventaSeleccionada, onCancelar,clientes, productos }) => {
  const [venta, setVenta] = useState({
    clienteId: "",
    productoId: "",
    cantidad: 1,
    fecha: "",
    total: 0,       
  });

    useEffect(() => {
    if (ventaSeleccionada) {
      setVenta(ventaSeleccionada);
    } else {
      setVenta({
        clienteId: "",
        productoId: "",
        cantidad: 1,
        fecha: "",
        total: 0,
        pagado: false,
      });
    }
    }, [ventaSeleccionada]);

    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVenta({
        ...venta,
        [name]: type === "checkbox" ? checked : (name === "cantidad" ? Number(value) : value)
    });
    };

    const handleSubmit = (e) => {
    e.preventDefault();
   onGuardar(venta);
    setVenta({
        clienteId: "",
        productoId: "",
        cantidad: 1,
        fecha: "",
        total: 0,
        pagado: false,
    });
    };

    return (
    <form onSubmit={handleSubmit}>
        <h3>{ventaSeleccionada ? "Editar Venta" : "Nueva Venta"}</h3>
        <select 
          name="clienteId" 
          value={venta.clienteId} 
          onChange={handleChange} required  
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>

        <select 
          name="productoId" 
          value={venta.productoId}  
            onChange={handleChange} 
            required
            >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}> 
                {producto.nombre} - ${producto.precio}
              </option>
            ))}
          </select>

        <input
          type="number"
          name="cantidad"
            value={venta.cantidad}
            onChange={handleChange}
            min="1"
            required
        />  
        <input
            type="date" 
            name="fecha"
            value={venta.fecha}
            onChange={handleChange}
            required
        />
        <label>
            Pagado:
            <input
            type="checkbox"
            name="pagado"
            checked={venta.pagado || false}
            onChange={handleChange}
            />
        </label>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
    );
}
export default FormVentas; 
   
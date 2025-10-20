import { useState, useEffect } from "react";
import "./FormCliente.css";


const FormCliente = ({ onGuardar, clienteSeleccionado, onCancelar }) => {
  const [cliente, setCliente] = useState({
    nombre: "",
    contacto: "",
    direccion: "",
  });

    useEffect(() => {
    if (clienteSeleccionado) {
      setCliente(clienteSeleccionado);
    } else {
      setCliente({
        nombre: "",
        contacto: "",
        direccion: "",
      });
    }
    }, [clienteSeleccionado]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
        ...cliente,
        [name]: value
    });
    };
    const handleSubmit = (e) => {
    e.preventDefault();
   onGuardar(cliente);
    setCliente({
        nombre: "",
        contacto: "",
        direccion: "",
    });
    };

    return (
    <form onSubmit={handleSubmit}>
        <h3>{clienteSeleccionado ? "Editar Cliente" : "Nuevo Cliente"}</h3> 
        <input
            type="text"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
        />
        <input
            type="text"
            name="contacto"
            value={cliente.contacto}
            onChange={handleChange}
            placeholder="Contacto"
            required
        />
        <input
            type="text"
            name="direccion"
            value={cliente.direccion}
            onChange={handleChange}
            placeholder="Direccion"
            required
        />
        <button type="submit">Guardar</button>
        {onCancelar && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
    );
}   
export default FormCliente;
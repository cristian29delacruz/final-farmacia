import { useState,useEffect } from "react";

const FormProducto = ({ onGuardar, productoSeleccionado, onCancelar }) => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    imagen: "",
  });

    useEffect(() => {
    if (productoSeleccionado) {
      setProducto({
        ...productoSeleccionado,
        imagen: productoSeleccionado.imagen || productoSeleccionado.imagenUrl || ""
      });
    } else {
      setProducto({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        imagen: "",
      });
    }
    }, [productoSeleccionado]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
        ...producto,
        [name]: name === "precio" || name === "stock" ? Number(value) : value
    });
    };
    const handleSubmit = (e) => {
    e.preventDefault();
    // Crear una copia del producto y asegurarse de que use 'imagen' en lugar de 'imagenUrl'
    const productoAGuardar = {
        ...producto,
        imagen: producto.imagen || producto.imagenUrl || ""
    };
    // Eliminar imagenUrl si existe para mantener consistencia
    delete productoAGuardar.imagenUrl;
    
    onGuardar(productoAGuardar);
    setProducto({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        imagen: "",
    });
    };

    return (
    <form onSubmit={handleSubmit}>
        <h3>{productoSeleccionado ? "Editar Producto" : "Nuevo Producto"}</h3>
        <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
        />
        <input
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
        />
        <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            placeholder="Precio"
            min="0"
            step="0.01"
            required
        />
        <input
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
            placeholder="Stock"
            min="0"
            required
        />
        <input
            type="text"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            placeholder="URL de la imagen"
        />
        <div className="form-buttons">
            <button type="submit">Guardar</button>
            {onCancelar && <button type="button" onClick={onCancelar}>Cancelar</button>}
        </div>
    </form>
    );
}
export default FormProducto;
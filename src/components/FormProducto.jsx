import { useState,useEffect } from "react";

const FormProducto = ({ onGuardar, productoSeleccionado, onCancelar }) => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    imagenUrl: "",
  });

    useEffect(() => {
    if (productoSeleccionado) {
      setProducto(productoSeleccionado);
    } else {
      setProducto({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        imagenUrl: "",
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
   onGuardar(producto);
    setProducto({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        imagenUrl: "",
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
            name="imagenUrl"
            value={producto.imagenUrl}
            onChange={handleChange}
            placeholder="URL de la imagen"
        />
        <button type="submit">Guardar</button>
        {onCancelar && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
    );
}
export default FormProducto;
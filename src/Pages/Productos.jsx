import { useState, useEffect } from "react";
import {getProductos, addProducto, editProducto, deleteProducto} from "../Services/Productos";
import { getVentas } from "../Services/Ventas";
import TablaProductos from "../components/TablaProductos";
import FormProducto from "../components/FormProducto";
import InventoryIcon from '@mui/icons-material/Inventory';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [ventas, setVentas] = useState([]);

  const cargarProductos = async () => {
    try {
      // GET - Obtener todos los productos
      const res = await getProductos();
      setProductos(res.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };
  useEffect(() => {
    cargarProductos();
  }, []);

  const handleAgregar = async (data) => {
    try {
      // POST - Crear nuevo producto
      await addProducto(data);
      cargarProductos();
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

    const handleEditar = (prod) => setEditando(prod);

    const handleActualizar = async (data) => {
        try {
            // PUT - Actualizar producto existente
            await editProducto(editando.id, data);
            setEditando(null);
            cargarProductos();
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    const handleEliminar = async (id) => {
        try {
            // GET - Verificar si el producto tiene ventas asociadas
            const res = await getVentas();
            const tieneVentas = res.data.some(v => String(v.productoId) === String(id));
            if (tieneVentas) {
                alert("No puedes eliminar este producto porque tiene ventas asociadas.");
                return;
            }
            // DELETE - Eliminar producto
            await deleteProducto(id);
            cargarProductos();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };
    return (
        <div>
            <h2>
                <InventoryIcon style={{ fontSize: 32, marginRight: 10, verticalAlign: 'middle' }} />
                Productos
            </h2>
            <FormProducto
                onGuardar={editando ? handleActualizar : handleAgregar}
                productoSeleccionado={editando}
                onCancelar={() => setEditando(null)}
            />
            <TablaProductos
                productos={productos}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
            />

        </div>
    );
}   
export default Productos;
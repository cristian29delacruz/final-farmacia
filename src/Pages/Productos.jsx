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
    const res = await getProductos();
    setProductos(res.data);
  };
  useEffect(() => {
    cargarProductos();
  }, []);

  const handleAgregar = async (data) => {
    await addProducto(data);
    cargarProductos();
  };

    const handleEditar = (prod) => setEditando(prod);

    const handleActualizar = async (data) => {
        await editProducto(editando.id, data);
        setEditando(null);
        cargarProductos();
    };

    const handleEliminar = async (id) => {
        const res = await getVentas();
        const tieneVentas = res.data.some(v => String(v.productoId) === String(id));
        if (tieneVentas) {
            alert("No puedes eliminar este producto porque tiene ventas asociadas.");
            return;
        }
        await deleteProducto(id);
        cargarProductos();
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
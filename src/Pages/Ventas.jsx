import { useEffect, useState } from "react";
import { getVentas, addVenta, editVenta, deleteVenta } from "../Services/Ventas";
import { getClientes } from "../Services/Clientes";
import { getProductos } from "../Services/Productos";
import TablaVentas from "../components/TablaVentas";
import FormVentas from "../components/FormVentas";
import "./Ventas.css";


const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [editando, setEditando] = useState(null);

  const cargarDatos = async () => {
    const [ventasRes, clientesRes, productosRes] = await Promise.all([
      getVentas(),
      getClientes(),
      getProductos()
    ]);
    setVentas(ventasRes.data);
    setClientes(clientesRes.data);
    setMedicamentos(productosRes.data);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleAgregar = async (data) => {
    await addVenta(data);
    cargarDatos();
  };

  const handleEditar = (venta) => setEditando(venta);

  const handleActualizar = async (data) => {
    await editVenta(editando.id, data);
    setEditando(null);
    cargarDatos();
  };

  const handleEliminar = async (id) => {
    await deleteVenta(id);
    cargarDatos();
  };

  return (
    <div className="ventas-container">
      <h2>Gestión de Ventas</h2>
      
      <div className="ventas-form">
        <FormVentas
          onGuardar={editando ? handleActualizar : handleAgregar}
          ventaSeleccionada={editando}
          onCancelar={() => setEditando(null)}
          clientes={clientes}
          productos={medicamentos}
        />
      </div>
      
      <div className="ventas-table-container">
        <TablaVentas
          ventas={ventas}
          clientes={clientes}
          productos={medicamentos}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      </div>
    </div>
  );
};

export default Ventas;

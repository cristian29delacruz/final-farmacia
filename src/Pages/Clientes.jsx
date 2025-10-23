import { useEffect, useState } from "react";
import HistorialVentas from "../components/HistorialVentas";
import { getVentas } from "../Services/Ventas";
import { getProductos } from "../Services/Productos";
import { getClientes, addCliente, editCliente, deleteCliente } from "../Services/Clientes";
import TablaClientes from "../components/TablaClientes";
import FormCliente from "../components/FormCliente";
import "./Clientes.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [ventas, setVentas] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [clienteHistorial, setClienteHistorial] = useState(null);

  const cargarDatos = async () => {
    const [cliRes, ventasRes, productosRes] = await Promise.all([
      getClientes(),
      getVentas(),
      getProductos()
    ]);
    setClientes(cliRes.data);
    setVentas(ventasRes.data);
    setMedicamentos(productosRes.data);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleAgregar = async (data) => {
    await addCliente(data);
    cargarDatos();
  };

  const handleEditar = (cli) => setEditando(cli);

  const handleActualizar = async (data) => {
    await editCliente(editando.id, data);
    setEditando(null);
    cargarDatos();
  };

  const handleEliminar = async (id) => {
    const res = await getVentas();
    const tieneVentas = res.data.some(v => String(v.clienteId) === String(id));
    if (tieneVentas) {
      alert("No puedes eliminar este cliente porque tiene ventas asociadas.");
      return;
    }
    await deleteCliente(id);
    cargarDatos();
  };

  const handleVerHistorial = (cli) => setClienteHistorial(cli);

  const handleCerrarHistorial = () => setClienteHistorial(null);

  return (
    <div className="admin-page">
      <div className="content-wrapper">
        <div className="admin-header">
          <h1 className="admin-title">Gestión de Clientes</h1>
          <p className="admin-subtitle">Administra la información de todos los clientes</p>
        </div>
        
        <FormCliente
          onGuardar={editando ? handleActualizar : handleAgregar}
          clienteSeleccionado={editando}
          onCancelar={() => setEditando(null)}
        />
        
        <TablaClientes
          clientes={clientes}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
          onVerHistorial={handleVerHistorial}
        />
        
        {clienteHistorial && (
          <div className="modal-overlay" onClick={handleCerrarHistorial}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <HistorialVentas
                ventas={ventas.filter(v => String(v.clienteId) === String(clienteHistorial.id))}
                productos={medicamentos}
                onCerrar={handleCerrarHistorial}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clientes;
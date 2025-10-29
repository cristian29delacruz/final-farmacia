import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVentas, addVenta, editVenta, deleteVenta } from "../Services/Ventas";
import { getClientes } from "../Services/Clientes";
import { getProductos } from "../Services/Productos";
import TablaVentas from "../components/TablaVentas";
import FormVentas from "../components/FormVentas";
import ModalExito from "../components/ModalExito";
import "./Ventas.css";


const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const cargarDatos = async () => {
    try {
      // GET - Obtener ventas, clientes y productos
      const [ventasRes, clientesRes, productosRes] = await Promise.all([
        getVentas(),
        getClientes(),
        getProductos()
      ]);
      setVentas(ventasRes.data);
      setClientes(clientesRes.data);
      setMedicamentos(productosRes.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleAgregar = async (data) => {
    try {
      // POST - Crear nueva venta
      await addVenta(data);
      cargarDatos();
      setMostrarModal(true);
    } catch (error) {
      console.error("Error al agregar venta:", error);
    }
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/");
  };

  const handleEditar = (venta) => setEditando(venta);

  const handleActualizar = async (data) => {
    try {
      // PUT - Actualizar venta existente
      await editVenta(editando.id, data);
      setEditando(null);
      cargarDatos();
    } catch (error) {
      console.error("Error al actualizar venta:", error);
    }
  };

  const handleEliminar = async (id) => {
    try {
      // DELETE - Eliminar venta
      await deleteVenta(id);
      cargarDatos();
    } catch (error) {
      console.error("Error al eliminar venta:", error);
    }
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

      <ModalExito
        mostrar={mostrarModal}
        onCerrar={handleCerrarModal}
        titulo="¡Venta Realizada con Éxito!"
        mensaje="La venta se ha registrado correctamente. Serás redirigido al inicio..."
      />
    </div>
  );
};

export default Ventas;

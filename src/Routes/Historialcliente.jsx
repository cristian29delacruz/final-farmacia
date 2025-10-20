import React from "react";
import { useParams } from "react-router-dom";
import HistorialClientes from " ../Pages/HistorialClientes";

const HistorialClientesRoute = () => {
    const { id } = useParams();
    return <HistorialClientes id={id} />;
}
export default HistorialClientesRoute;
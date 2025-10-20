import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarCustom.css"

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
        navigate("/login");
    }
    return (
    <nav className="navbar-custom">
        <ul className="navbar-list">
        <li>
            <Link className="navbar-link" to="/home">Inicio</Link>
        </li>
        <li>
            <Link className="navbar-link" to="/productos">Productos</Link>
        </li>
        {user && (user.rol === "admin" || user.rol === "empleado") && (
            <li>
                <Link className="navbar-link" to="/ventas">Ventas</Link>
            </li>
        )}
                {!user && (
                    <li>
                        <Link className="navbar-link" to="/login">Login</Link>
                    </li>
                )}
                {user && user.rol === "admin" && (
                    <li>
                        <Link className="navbar-link" to="/usuarios">Usuarios</Link>
                    </li>
                )}
                {user && (
                    <li>
                    <button className="navbar-link logout-button" onClick={handleLogout}>Cerrar Sesión</button>
                    </li>
                )}
        </ul>
    </nav>
    );
}   
export default Navbar;
        
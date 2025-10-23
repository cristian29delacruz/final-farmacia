import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarCustom.css"

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("usuarioLogueado");
        navigate("/login");
        setIsMenuOpen(false); // Cerrar menú al hacer logout
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <nav className="navbar-custom">
            <div className="navbar-container">
                <button 
                    className="hamburger-menu"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                </button>
                
                <ul className={`navbar-list ${isMenuOpen ? 'menu-open' : ''}`}>
                    <li>
                        <Link className="navbar-link" to="/home" onClick={closeMenu}>Inicio</Link>
                    </li>
                    <li>
                        <Link className="navbar-link" to="/productos" onClick={closeMenu}>Productos</Link>
                    </li>
                    {user && (user.rol === "admin" || user.rol === "empleado") && (
                        <li>
                            <Link className="navbar-link" to="/ventas" onClick={closeMenu}>Ventas</Link>
                        </li>
                    )}
                    {user && user.rol === "admin" && (
                        <li>
                            <Link className="navbar-link" to="/clientes" onClick={closeMenu}>Clientes</Link>
                        </li>
                    )}
                    {!user && (
                        <li>
                            <Link className="navbar-link" to="/login" onClick={closeMenu}>Login</Link>
                        </li>
                    )}
                    {user && user.rol === "admin" && (
                        <li>
                            <Link className="navbar-link" to="/usuarios" onClick={closeMenu}>Usuarios</Link>
                        </li>
                    )}
                    {user && (
                        <li>
                            <button className="navbar-link logout-button" onClick={handleLogout}>Cerrar Sesión</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}   
export default Navbar;
        
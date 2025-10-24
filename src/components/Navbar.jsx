import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarCustom.css"
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

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
                        <Link className="navbar-link" to="/home" onClick={closeMenu}>
                            <HomeIcon style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} />
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link className="navbar-link" to="/productos" onClick={closeMenu}>
                            <InventoryIcon style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} />
                            Productos
                        </Link>
                    </li>
                    {user && (user.rol === "admin" || user.rol === "empleado") && (
                        <li>
                            <Link className="navbar-link" to="/ventas" onClick={closeMenu}>
                                <ShoppingCartIcon style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} />
                                Ventas
                            </Link>
                        </li>
                    )}
                    {user && user.rol === "admin" && (
                        <li>
                            <Link className="navbar-link" to="/clientes" onClick={closeMenu}>
                                <PeopleIcon style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} />
                                Clientes
                            </Link>
                        </li>
                    )}
                    {!user && (
                        <li>
                            <Link className="navbar-link" to="/login" onClick={closeMenu}>
                                <LoginIcon style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} />
                                Login
                            </Link>
                        </li>
                    )}
                    {user && user.rol === "admin" && (
                        <li>
                            <Link className="navbar-link" to="/usuarios" onClick={closeMenu}>
                                <GroupIcon style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} />
                                Usuarios
                            </Link>
                        </li>
                    )}
                    {user && (
                        <li>
                            <button className="navbar-link logout-button" onClick={handleLogout}>
                                <LogoutIcon style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} />
                                Cerrar Sesión
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}   
export default Navbar;
        
import React from "react";
import "./HeaderFooter.css";

const Footer = () => {
    return (
        <footer className="main-footer">
            <p>
                &copy; {new Date().getFullYear()} Farmacia. Todos los derechos reservados.
            </p>
        </footer>
    );
};

export default Footer;
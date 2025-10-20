import React,{useEffect, useState} from "react";
import "./HeaderFooter.css";

const Header = () => {
    const [hide, setHide] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 60) {
            setHide(true);
        } else {
            setHide(false);
        }   
        setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => 
      window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header className={`main-header ${hide ? "hide-header" : ""}`}>
            <h1>⚕️Farmacia</h1>
            <p>¡la salud siempre primero!</p>
        </header>
    );

};

export default Header;
            

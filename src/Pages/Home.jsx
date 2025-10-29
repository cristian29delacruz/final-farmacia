import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addVenta } from "../Services/Ventas";
import React from "react";
import "./Home.css";
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import ModalExito from "../components/ModalExito";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("all");
  const [user, setUser] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                // GET - Obtener todos los productos
                const response = await axios.get("http://localhost:3001/productos");
                setProductos(response.data);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };
        cargarProductos();
    }, []);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuarioLogueado");
        if (usuarioGuardado) {
            setUser(JSON.parse(usuarioGuardado));
        }
    }, []);

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        && (categoria === "all" || ((producto.categoria || "").toLowerCase() === categoria.toLowerCase()))
    );
    const showCenteredMessage = (msg) => {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";

        const box = document.createElement("div");
        box.style.background = "#fff";
        box.style.padding = "20px";
        box.style.borderRadius = "8px";
        box.style.textAlign = "center";
        box.style.minWidth = "320px";
        box.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";

        const p = document.createElement("p");
        p.textContent = msg;
        p.style.marginBottom = "16px";

        const btnLogin = document.createElement("button");
        btnLogin.className = "btn btn-primary";
        btnLogin.textContent = "Ir a login";
        btnLogin.onclick = () => {
            document.body.removeChild(overlay);
            navigate("/login");
        };

        const btnClose = document.createElement("button");
        btnClose.className = "btn btn-secondary ms-2";
        btnClose.textContent = "Cerrar";
        btnClose.onclick = () => {
            document.body.removeChild(overlay);
        };

        box.appendChild(p);
        box.appendChild(btnLogin);
        box.appendChild(btnClose);
        overlay.appendChild(box);
        document.body.appendChild(overlay);
    };

    const handleventa = async (producto) => {
        if (!user) {
            showCenteredMessage("Por favor, inicie sesión para realizar una comprar.");
            return;
        }
        try {
            const venta = {
                id_producto: producto.id,
                id_usuario: user.id,
                cantidad: 1,
                total: producto.precio,
                fecha: new Date().toISOString()
            };

            // POST - Crear nueva venta
            await addVenta(venta);
            setMostrarModal(true);
        } catch (error) {
            console.error("Error al realizar la venta:", error);
            alert("Error al realizar la venta. Por favor, intente de nuevo.");
        }
    }

    const handleCerrarModal = () => {
        setMostrarModal(false);
        navigate("/");
    };
    return (
        <div className="container mt-4">
            <h1 className="mb-4">
                <LocalPharmacyIcon style={{ fontSize: 40, marginRight: 10, verticalAlign: 'middle' }} />
                Productos
            </h1>
                        <div className="search-bar mb-4">
                                <div className="search-inner">
                                    <span className="search-icon" aria-hidden>
                                        <SearchIcon style={{ fontSize: 18 }} />
                                    </span>
                                    <input
                                            type="text"
                                            className="search-input"
                                            placeholder="Buscar productos..."
                                            value={busqueda}
                                            onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                                                        <select
                                                                            className="search-select"
                                                                            value={categoria}
                                                                            onChange={(e) => setCategoria(e.target.value)}
                                                                            aria-label="Filtrar por categoría"
                                                                        >
                                                                            <option value="all">Todas las categorías</option>
                                                                            {Array.from(new Set(productos.map(p => (p.categoria || "").trim()).filter(Boolean))).map(cat => (
                                                                                <option key={cat} value={cat}>{cat}</option>
                                                                            ))}
                                                                        </select>
                                </div>
                        </div>
            <div className="home-products">
                {productosFiltrados.map(producto => (
                    <div className="product-card" key={producto.id}>
                        <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                        <div className="card-body">
                            <h5 className="card-title">{producto.nombre}</h5>
                            <p className="card-text">Precio: ${producto.precio}</p>
                            <div style={{marginTop: 'auto'}}>
                                <button className="btn-primary" onClick={() => handleventa(producto)}>
                                    <ShoppingCartIcon style={{ fontSize: 18, marginRight: 5, verticalAlign: 'middle' }} />
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ModalExito
                mostrar={mostrarModal}
                onCerrar={handleCerrarModal}
                titulo="¡Compra Exitosa!"
                mensaje="Tu compra se ha realizado correctamente. Serás redirigido al inicio..."
            />
        </div>
    );
}
export default Home;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";


const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Iniciando sesión con:", { usuario, password });
        setLoading(true);
        setError("");
        try {
            // Obtener la lista de usuarios desde la API (o ajustar a la respuesta real de tu endpoint)
            const { data } = await axios.get("http://localhost:3001/usuarios");

            console.log("Datos recibidos de la API:", data);
            const user = data.find(
                (u) => u.email === usuario && u.password === password
            );
            console.log("Usuario encontrado:", user);
            if (user) {
                localStorage.setItem("usuarioLogueado", JSON.stringify(user));

                if (user.rol === "admin") {
                    navigate("/productos");
                } else {
                    navigate("/home");
                }
            } else {
                setError("Usuario o contraseña incorrectos");
            }
        } catch (err) {
            setError("Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Iniciar Sesión</h2>
                {error && <p className="alert alert-danger">{error}</p>}
                <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    placeholder="Contraseña"
                    value={password}    
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading || !usuario || !password}>
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                </button>

                <p className="login-link">
                    ¿No tienes una cuenta? (" ")
                    <span onClick={() => navigate("/registro")} className="link-registrate">
                        Regístrate
                    </span>
                </p>
            </form>
        </div>
    );
};


                
export default Login;



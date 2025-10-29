import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockIcon from '@mui/icons-material/Lock';


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
            // GET - Obtener la lista de usuarios desde la API
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
                <h2>
                    <LockIcon style={{ fontSize: 32, marginRight: 10, verticalAlign: 'middle' }} />
                    Iniciar Sesión
                </h2>
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
                <div className="login-actions">
                    <button type="submit" className="btn-primary" disabled={loading || !usuario || !password}>
                        <LoginIcon style={{ fontSize: 18, marginRight: 5, verticalAlign: 'middle' }} />
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/registro')}>
                        <PersonAddIcon style={{ fontSize: 18, marginRight: 5, verticalAlign: 'middle' }} />
                        Registrarse
                    </button>
                </div>
                <p className="login-link">
                    ¿No tienes una cuenta?
                </p>
            </form>
        </div>
    );
};


                
export default Login;



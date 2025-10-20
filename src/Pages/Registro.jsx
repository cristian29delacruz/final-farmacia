import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registro = () => {
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegistro = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const { data } = await axios.get("http://localhost:3001/api/usuarios");
            const existe = data.find(
                (u) => u.usuario === usuario
            );
            if (existe) {
                setError("El usuario ya existe");
                setLoading(false);
                return;
            }
            await axios.post("http://localhost:3001/api/usuarios", {
                nombre,
                usuario,
                password,
                email,
                rol: "user"
            });
            alert("Registro exitoso, por favor inicie sesión");
            navigate("/login");
        } catch (err) {
            setError("Error al registrar usuario");
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className="registro-container">
            <form onSubmit={handleRegistro} className="registro-form">
                <h2>Registro</h2>
                {error && <p className="alert alert-danger">{error}</p>}
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
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
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={ !nombre || !usuario || !password || !email || loading }>
                    {loading ? "Cargando..." : "Registrarse"}
                </button>
            </form>
        </div>
    );
}
export default Registro;
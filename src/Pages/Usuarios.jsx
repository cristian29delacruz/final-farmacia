import { useEffect, useState } from "react";
import { getUsuarios, addUsuario, editarUsuario, deleteUsuario } from "../Services/Usuarios";
import "./Usuarios.css";


const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [editNombre, setEditNombre] = useState("");
    const [editUsuario, setEditUsuario] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editRol, setEditRol] = useState("cliente");

    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nuevoUsuario, setNuevoUsuario] = useState("");
    const [nuevoPassword, setNuevoPassword] = useState("");
    const [nuevoEmail, setNuevoEmail] = useState("");
    const [nuevoRol, setNuevoRol] = useState("cliente");

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const { data } = await getUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };
        fetchUsuarios();
    }, []);

    const eliminarUsuario = async (id) => {
        const usuarioseleccionado = usuarios.find(u => String(u.id) === String(id));
        if (!usuarioseleccionado) return;
        if (usuarioseleccionado.rol === "admin") {
            alert("No se puede eliminar un usuario administrador");
            return;
        }
        if (window.confirm(
            `¿Está seguro de que desea eliminar a ${usuarioseleccionado.nombre || usuarioseleccionado.usuario}?`)) {
            try {
                await deleteUsuario(id);
                setUsuarios(usuarios.filter(u => String(u.id) !== String(id)));
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
            }
        }
    };

    const seleccionarUsuario = (usuario) => {
        setUsuarioEditando(usuario);
        setEditNombre(usuario.nombre || "");
        setEditUsuario(usuario.usuario || "");
        setEditPassword("");
        setEditEmail(usuario.email || "");
        setEditRol(usuario.rol || "cliente");
    };

    const guardarcambios = async (id) => {
        if (!usuarioEditando) return;
        if (usuarioEditando.rol === "admin" && editRol !== "admin") {
            alert("No se puede cambiar el rol de un usuario administrador");
            return;
        }

        try {
            const usuarioactualizado = {
                ...usuarioEditando,
                nombre: editNombre,
                usuario: editUsuario,
                password: editPassword !== "" ? editPassword : usuarioEditando.password,
                email: editEmail,
                rol: editRol
            };
            await editarUsuario(id, usuarioactualizado);
            setUsuarios(usuarios.map(u => (String(u.id) === String(id) ? usuarioactualizado : u)));
            setUsuarioEditando(null);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    const agregarUsuario = async (e) => {
        e.preventDefault();
        if (usuarios.some((u) => u.usuario === nuevoUsuario)) {
            alert("El nombre de usuario ya existe");
            return;
        }

        try {
            const maxId = usuarios.length ? Math.max(...usuarios.map((u) => Number(u.id) || 0)) : 0;
            const nuevoUsuarioObjeto = {
                id: String(maxId + 1),
                nombre: nuevoNombre,
                usuario: nuevoUsuario,
                password: nuevoPassword,
                email: nuevoEmail,
                rol: nuevoRol
            };
            const { data } = await addUsuario(nuevoUsuarioObjeto);
            setUsuarios([...usuarios, data]);
            setNuevoNombre("");
            setNuevoUsuario("");
            setNuevoPassword("");
            setNuevoEmail("");
            setNuevoRol("cliente");
        } catch (error) {
            console.error("Error al agregar usuario:", error);
        }
    };

    return (
        <div className="usuarios-container">
            <h2>Gestión de Usuarios</h2>

            <form onSubmit={agregarUsuario} className="crear-form">
                <h3>Agregar Nuevo Usuario</h3>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Usuario"
                    value={nuevoUsuario}
                    onChange={(e) => setNuevoUsuario(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={nuevoPassword}
                    onChange={(e) => setNuevoPassword(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={nuevoEmail}
                    onChange={(e) => setNuevoEmail(e.target.value)}
                    required
                />
                <select
                    value={nuevoRol}
                    onChange={(e) => setNuevoRol(e.target.value)}
                >
                    <option value="cliente">Cliente</option>
                    <option value="admin">Administrador</option>
                </select>
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>

            {usuarioEditando && (
                <form onSubmit={(e) => { e.preventDefault(); guardarcambios(usuarioEditando.id); }} className="editar-form">
                    <h3>Editar Usuario</h3>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={editNombre}
                        onChange={(e) => setEditNombre(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={editUsuario}
                        onChange={(e) => setEditUsuario(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña (dejar en blanco para no cambiar)"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        required
                    />
                    <select
                        value={editRol}
                        onChange={(e) => setEditRol(e.target.value)}
                    >
                        <option value="cliente">Cliente</option>
                        <option value="admin">Administrador</option>
                    </select>
                    <button type="submit" className="btn btn-success">Guardar Cambios</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setUsuarioEditando(null)}>Cancelar</button>
                </form>
            )}

            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => seleccionarUsuario(usuario)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default Usuarios;

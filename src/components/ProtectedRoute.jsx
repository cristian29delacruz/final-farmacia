import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
    const user = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (!user) return <Navigate to="/login" replace />;

    if (roles && !roles.includes(user.rol)) return <Navigate to="/home" replace />;

    return children;
};

export default ProtectedRoute;
    

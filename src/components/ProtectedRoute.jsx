import { Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../utils/auth";

/**
 * Protected route component that checks authentication and admin role
 */
const ProtectedRoute = ({ children, requireAdmin = false }) => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Check if admin access is required
    if (requireAdmin && !isAdmin()) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

import { useSelector } from "react-redux"
import { Navigate } from "react-router";

const ProtectedRoutes = ({ allowedRole, children }) => {

    const { authData, isAuthenticated } = useSelector((state) => state.auth);
    console.log(isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />
    }

    if (!allowedRole.includes(authData?.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children;
}

export default ProtectedRoutes
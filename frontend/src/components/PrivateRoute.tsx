import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@services/auth/context/AuthContext";

export default function PrivateRoute() {
    const { user } = useAuth();
    console.log("PrivateRoute - user", user);

    return user ? <Outlet /> : <Navigate to={"/login"} />;
}
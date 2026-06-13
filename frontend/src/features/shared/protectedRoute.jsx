import { Navigate, Outlet } from "react-router-dom";
import { authContext } from "../auth/auth.context";
import { useContext } from "react";
import Loader from "./Loader";

/**
 * @boilerplate ProtectedRoute
 * Usage: Wrap karo jinhe login chahiye
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/dashboard" element={<Dashboard />} />
 * </Route>
 */
const ProtectedRoute = ({ redirectTo = "/auth" }) => {
    const { isAuthenticated, isInitializing } = useContext(authContext);

  if (isInitializing) return <Loader />;
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
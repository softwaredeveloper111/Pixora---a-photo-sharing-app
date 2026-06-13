import { Navigate, Outlet } from "react-router-dom";
import { authContext } from "../auth/auth.context";
import { useContext } from "react";
import Loader from './Loader'

/**
 * @boilerplate GuestRoute
 * Usage: Login/Register pages ke liye
 * <Route element={<GuestRoute />}>
 *   <Route path="/login" element={<Login />} />
 * </Route>
 */
const GuestRoute = ({ redirectTo = "/dashboard" }) => {
  const { isAuthenticated, isInitializing } = useContext(authContext);

  if (isInitializing) return <Loader />;
  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
};

export default GuestRoute;
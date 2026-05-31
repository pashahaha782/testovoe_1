import { useAuthorizedUser } from "../shared/stores/userStore.ts";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../shared/routes/routes.ts";

export function ProtectedRoute() {
  const session = useAuthorizedUser();

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}

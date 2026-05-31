import { ROUTES } from "../shared/routes/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./App.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { Header } from "../shared/ui/Header/Header.tsx";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: (
          <>
            <Header />
            <ProtectedRoute />
          </>
        ),
        children: [
          {
            path: ROUTES.CATALOG,
            lazy: () => import("../pages/CatalogPage.tsx"),
          },
          {
            path: ROUTES.PRODUCT,
            lazy: () => import("../pages/ProductPage.tsx"),
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("../features/auth/pages/LoginPage.tsx"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("../features/auth/pages/RegisterPage.tsx"),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.CATALOG),
      },
    ],
  },
]);

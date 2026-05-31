import { ROUTES } from "../shared/routes/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./app";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.LOGIN,
        lazy: () => import("../features/auth/pages/LoginPage.tsx"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("../features/auth/pages/RegisterPage.tsx"),
      },
      {
        path: ROUTES.CATALOG,
        lazy: () => import("../pages/CatalogPage.tsx"),
      },
      {
        path: ROUTES.PRODUCT,
        lazy: () => import("../pages/ProductPage.tsx"),
      },
      {
        path: ROUTES.HOME,
        lazy: () => import("../pages/HomePage.tsx"),
      },
      {
        path: "*",
        loader: () => redirect(ROUTES.HOME),
      },
    ],
  },
]);

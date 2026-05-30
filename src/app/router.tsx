import { ROUTES } from "../shared/routes/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./app";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.CATALOG,
        lazy: () => import("../pages/catalog.page"),
      },
      {
        path: ROUTES.PRODUCT,
        lazy: () => import("../pages/product.page"),
      },
      {
        path: ROUTES.HOME,
        lazy: () => import("../pages/home.page"),
      },
      {
        path: "*",
        loader: () => redirect(ROUTES.HOME),
      },
    ],
  },
]);
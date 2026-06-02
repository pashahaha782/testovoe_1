import { ROUTES } from "../shared/routes/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./App.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { Header } from "../shared/ui/Header/Header.tsx";
import { Footer } from "../shared/ui/Footer/Footer.tsx";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: (
          <>
            <Header />
            <ProtectedRoute />
            <Footer />
          </>
        ),
        children: [
          {
            path: ROUTES.CATALOG,
            lazy: () => import("../features/catalog/pages/CatalogPage.tsx"),
          },
          {
            path: ROUTES.PICTURE,
            lazy: () => import("../features/picture/pages/PicturePage.tsx"),
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

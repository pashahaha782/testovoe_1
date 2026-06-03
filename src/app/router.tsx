import { ROUTES } from "../shared/routes/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./App.tsx";
import { GuestLayout } from "../shared/ui/GuestLayout/GuestLayout.tsx";
import { MainLayout } from "../shared/ui/MainLayout/MainLayout.tsx";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.CATALOG,
            lazy: () => import("../features/catalog/pages/CatalogPage.tsx"),
          },
          {
            path: ROUTES.PICTURE_CREATE,
            lazy: () => import("../features/picture/pages/PhotoFormPage.tsx"),
          },
          {
            path: ROUTES.PICTURE_EDIT,
            lazy: () => import("../features/picture/pages/PhotoFormPage.tsx"),
          },
          {
            path: ROUTES.PICTURE,
            lazy: () => import("../features/picture/pages/PicturePage.tsx"),
          },
        ],
      },
      {
        element: <GuestLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            lazy: () => import("../features/auth/pages/LoginPage.tsx"),
          },
          {
            path: ROUTES.REGISTER,
            lazy: () => import("../features/auth/pages/RegisterPage.tsx"),
          },
        ],
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.CATALOG),
      },
    ],
  },
]);

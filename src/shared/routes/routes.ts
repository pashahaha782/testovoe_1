import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CATALOG: "/catalog",
  PICTURE_CREATE: "/picture/new",
  PICTURE_EDIT: "/picture/:pictureId/edit",
  PICTURE: "/picture/:pictureId",
} as const;

export type PathParams = {
  [ROUTES.PICTURE]: {
    pictureId: string;
  };
  [ROUTES.PICTURE_EDIT]: {
    pictureId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}

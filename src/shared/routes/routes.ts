import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CATALOG: "/catalog",
  PICTURE: "/picture/:pictureId",
} as const;

export type PathParams = {
  [ROUTES.PICTURE]: {
    pictureId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}

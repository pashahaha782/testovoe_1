import "react-router-dom"

export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalog",
  PRODUCT: "/product/:productId",
} as const;

export type PathParams = {
  [ROUTES.PRODUCT]: {
    productId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
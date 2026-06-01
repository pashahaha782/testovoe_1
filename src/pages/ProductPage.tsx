import { useParams } from "react-router-dom";
import { type PathParams, ROUTES } from "../shared/routes/routes.ts";

function ProductPage() {
  const params = useParams<PathParams[typeof ROUTES.PICTURE]>();
  return <div>Product page {params.pictureId}</div>;
}

export const Component = ProductPage;

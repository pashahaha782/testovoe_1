import { useParams } from "react-router-dom";
import {type PathParams, ROUTES} from "../shared/routes/routes.ts";

function ProductPage() {
  const params = useParams<PathParams[typeof ROUTES.PRODUCT]>();
  return (
    <div>
      Product page {params.productId}
    </div>
  )
}

export const Component = ProductPage
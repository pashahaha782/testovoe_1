import { Link, href } from "react-router-dom"
import {ROUTES} from "../shared/routes/routes.ts";

function CatalogPage() {
  return (
    <div>
      Catalog page
      <Link to={href(ROUTES.PRODUCT, { productId: "1" })}>Product 1</Link>
    </div>
  )
}

export const Component = CatalogPage
import {Link} from "react-router-dom";
import {ROUTES} from "../shared/routes/routes.ts";

function HomePage() {

  return (
    <div>
      Home page
      <Link to={ROUTES.CATALOG}>Перейти в каталог</Link>
    </div>
  )
}

export const Component = HomePage
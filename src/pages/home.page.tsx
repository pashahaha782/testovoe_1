import {Link} from "react-router-dom";
import {ROUTES} from "../shared/routes/routes.ts";
import {Box} from "@mui/material";

function HomePage() {

  return (
    <div>
      Home page
      <Link to={ROUTES.CATALOG}>Перейти в каталог</Link>

      <Box >MUI</Box>
    </div>
  )
}

export const Component = HomePage
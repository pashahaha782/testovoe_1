import { Outlet } from "react-router-dom"
import {AppHeader} from "../shared/ui/header";

export function App() {

  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  )
}


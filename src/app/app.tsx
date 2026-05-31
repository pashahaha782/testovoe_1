import { Outlet } from "react-router-dom";
import { Header } from "../shared/ui/Header/Header.tsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme.ts";
import { useIsAuthenticated } from "../shared/stores/userStore.ts";

export function App() {
  const authorized = useIsAuthenticated();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {authorized && <Header />}
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

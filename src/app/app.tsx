import { Outlet } from "react-router-dom";
import { Header } from "../shared/ui/Header/Header.tsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme.ts";
import { useAuthorizedUser } from "../shared/stores/authStore.ts";

export function App() {
  const authorized = useAuthorizedUser();
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

import { Outlet } from "react-router-dom";
import { Header } from "../shared/ui/Header/Header.tsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme.ts";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Header />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

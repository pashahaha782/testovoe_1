import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme.ts";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

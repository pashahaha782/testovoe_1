import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../theme.ts";
import { useThemeStore } from "../shared/stores/themeStore.ts";

export function App() {
  const { mode } = useThemeStore();
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

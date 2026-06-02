import { createTheme } from "@mui/material/styles";

const baseTheme = {
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.015em",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    overline: {
      fontWeight: 600,
      letterSpacing: "0.14em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 999,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
};

const lightTheme = {
  palette: {
    mode: "light" as const,
    primary: {
      main: "#C4A962",
      light: "#E8DDB8",
      dark: "#9A8240",
      contrastText: "#1A1A1A",
    },
    background: {
      default: "#F7F5F0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#5C5C5C",
    },
    divider: "rgba(26, 26, 26, 0.08)",
  },
};

// Тёмная тема
const darkTheme = {
  palette: {
    mode: "dark" as const,
    primary: {
      main: "#C4A962",
      light: "#E8DDB8",
      dark: "#9A8240",
      contrastText: "#1A1A1A",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
};

export const getTheme = (mode: "light" | "dark") => {
  return createTheme({
    ...baseTheme,
    ...(mode === "light" ? lightTheme : darkTheme),
  });
};

export const theme = getTheme("light");

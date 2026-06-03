import { Box } from "@mui/material";
import { Header } from "../Header/Header.tsx";
import { Footer } from "../Footer/Footer.tsx";
import { ProtectedRoute } from "../../../app/ProtectedRoute.tsx";

export function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ProtectedRoute />
      </Box>

      <Footer />
    </Box>
  );
}

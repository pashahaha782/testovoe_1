import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle.tsx";

export function GuestLayout() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <ThemeToggle />
      </Box>
      <Outlet />
    </Box>
  );
}

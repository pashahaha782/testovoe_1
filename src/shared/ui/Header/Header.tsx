import { useState } from "react";
import { useAuthorizedUser } from "../../stores/userStore.ts";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes.ts";
import MenuIcon from "@mui/icons-material/Menu";
import { ModalMenu } from "./ModalMenu.tsx";

export function Header() {
  const session = useAuthorizedUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!session) {
    return null;
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.default",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            maxWidth: "1200px",
            width: "100%",
            mx: "auto",
            px: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": { opacity: 0.8 },
            }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            PhotoSphere
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {session?.email}
            </Typography>

            <IconButton
              onClick={() => setIsModalOpen(true)}
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "grey.300",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <ModalMenu open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

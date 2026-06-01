import { logout, useAuthorizedUser } from "../../stores/userStore.ts";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes.ts";

export function Header() {
  const session = useAuthorizedUser();
  const navigate = useNavigate();

  if (!session) {
    return null;
  }
  return (
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
          <Button
            variant="outlined"
            size="small"
            onClick={() => logout()}
            sx={{
              color: "text.secondary",
              borderColor: "text.secondary",
              "&:hover": {
                backgroundColor: "error.light",
                borderColor: "error.main",
              },
            }}
          >
            Выйти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

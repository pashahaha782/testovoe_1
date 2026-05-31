import { logout, useAuthorizedUser } from "../../stores/userStore.ts";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export function Header() {
  const session = useAuthorizedUser();

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
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          PhotoSphere
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {session?.email}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => logout()}
            sx={{
              "&:hover": {
                backgroundColor: "error.dark",
                borderColor: "error.main",
                color: "text.secondary",
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

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Modal,
  Divider,
  List,
  ListItem,
  ListItemText,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes.ts";
import { logout } from "../../stores/userStore.ts";
import LogoutIcon from "@mui/icons-material/Logout";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";

interface ModalMenuProps {
  open: boolean;
  onClose: () => void;
}

export function ModalMenu({ open, onClose }: ModalMenuProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Slide
        direction="left"
        in={open}
        timeout={{
          enter: 500,
          exit: 300,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "background.default",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppBar
            position="static"
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
                minHeight: "64px",
              }}
            >
              <Typography
                variant="h5"
                component="span"
                sx={{
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={() => {
                  navigate(ROUTES.HOME);
                  onClose();
                }}
              >
                PhotoSphere
              </Typography>

              <IconButton
                onClick={onClose}
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "error.main",
                    filter: "drop-shadow(0 2px 6px rgba(211, 47, 47, 0.4))",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 3,
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 4, textAlign: "center", fontWeight: 500 }}
            >
              Меню
            </Typography>

            <List
              sx={{
                width: "100%",
                maxWidth: 400,
                backgroundColor: "background.paper",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <ListItem
                component="a"
                href="/catalog#gallery"
                onClick={onClose}
                sx={{
                  cursor: "pointer",
                  py: 2,
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <PhotoLibraryIcon sx={{ mr: 2, color: "primary.main" }} />
                <ListItemText primary="Все фотографии" />
              </ListItem>

              <Divider />

              <ListItem
                component="a"
                href="/catalog#featured"
                onClick={onClose}
                sx={{
                  cursor: "pointer",
                  py: 2,
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <StarIcon sx={{ mr: 2, color: "primary.main" }} />
                <ListItemText primary="Избранные работы" />
              </ListItem>

              <Divider />

              <ListItem
                component="button"
                onClick={handleLogout}
                sx={{
                  cursor: "pointer",
                  py: 2,
                  "&:hover": {
                    borderColor: "error.light",
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <LogoutIcon sx={{ mr: 2, color: "error.main" }} />
                <Typography variant="body1" sx={{ color: "error.main" }}>
                  Выйти
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}

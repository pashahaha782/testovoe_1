import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Modal,
  Slide,
  Stack,
  ButtonBase,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes.ts";
import { logout, useIsAdmin } from "../../stores/userStore.ts";
import LogoutIcon from "@mui/icons-material/Logout";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ModalMenuProps {
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  {
    id: "gallery",
    label: "Все фотографии",
    description: "Полная коллекция проектов",
    icon: PhotoLibraryIcon,
  },
  {
    id: "featured",
    label: "Избранные работы",
    description: "Лучшие проекты",
    icon: StarIcon,
  },
] as const;

export function ModalMenu({ open, onClose }: ModalMenuProps) {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  const handleNavigateToSection = (sectionId: string) => {
    onClose();

    if (
      location.pathname === ROUTES.CATALOG &&
      location.hash === `#${sectionId}`
    ) {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(`${ROUTES.CATALOG}#${sectionId}`);

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

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
            inset: 0,
            backgroundColor: "background.default",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
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
                aria-label="Закрыть меню"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "error.main",
                    backgroundColor: "rgba(211, 47, 47, 0.08)",
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
              alignItems: "center",
              justifyContent: "center",
              px: { xs: 2, sm: 3 },
              py: { xs: 4, md: 6 },
            }}
          >
            <Stack
              spacing={3}
              sx={{
                width: "100%",
                maxWidth: 480,
              }}
            >
              <Stack spacing={1.5} component="nav">
                {NAV_ITEMS.map(({ id, label, description, icon: Icon }) => (
                  <ButtonBase
                    key={id}
                    component="a"
                    onClick={() => handleNavigateToSection(id)}
                    sx={{
                      width: "100%",
                      display: "block",
                      textAlign: "left",
                      borderRadius: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2.5,
                        backgroundColor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        transition:
                          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(196, 169, 98, 0.12)",
                          color: "primary.main",
                          flexShrink: 0,
                        }}
                      >
                        <Icon />
                      </Box>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="subtitle1"
                          component="h2"
                          sx={{ fontWeight: 600, mb: 0.25 }}
                        >
                          {label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {description}
                        </Typography>
                      </Box>

                      <ArrowForwardIcon
                        sx={{ color: "text.secondary", fontSize: 20 }}
                      />
                    </Box>
                  </ButtonBase>
                ))}
                {isAdmin && (
                  <Box
                    component="a"
                    onClick={() => {
                      onClose();
                      navigate(ROUTES.PICTURE_CREATE);
                    }}
                    sx={{
                      width: "100%",
                      display: "block",
                      textAlign: "left",
                      borderRadius: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2.5,
                        backgroundColor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        transition:
                          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(196, 169, 98, 0.12)",
                          color: "primary.main",
                          flexShrink: 0,
                        }}
                      >
                        <AddIcon />
                      </Box>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="subtitle1"
                          component="h2"
                          sx={{ fontWeight: 600, mb: 0.25 }}
                        >
                          Новая публикация
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Создать новую фотографию
                        </Typography>
                      </Box>

                      <ArrowForwardIcon
                        sx={{ color: "text.secondary", fontSize: 20 }}
                      />
                    </Box>
                  </Box>
                )}
              </Stack>

              <ButtonBase
                onClick={handleLogout}
                sx={{
                  width: "100%",
                  display: "block",
                  textAlign: "left",
                  borderRadius: 3,
                  mt: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2.5,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "rgba(211, 47, 47, 0.2)",
                    backgroundColor: "rgba(211, 47, 47, 0.04)",
                    transition:
                      "background-color 0.25s ease, border-color 0.25s ease",
                    "&:hover": {
                      backgroundColor: "rgba(211, 47, 47, 0.08)",
                      borderColor: "error.main",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(211, 47, 47, 0.1)",
                      color: "error.main",
                      flexShrink: 0,
                    }}
                  >
                    <LogoutIcon />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      component="h2"
                      sx={{ fontWeight: 600, color: "error.main" }}
                    >
                      Выйти
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Завершить текущую сессию
                    </Typography>
                  </Box>
                </Box>
              </ButtonBase>
            </Stack>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}

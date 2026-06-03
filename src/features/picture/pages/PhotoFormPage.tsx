import { Box, Container, Paper, Typography } from "@mui/material";
import {
  generatePath,
  Navigate,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { PhotoForm } from "../components/PhotoForm";
import { usePhoto } from "../hooks/usePhoto";
import { type PathParams, ROUTES } from "../../../shared/routes/routes.ts";
import {
  canManagePhoto,
  createPhoto,
  updatePhoto,
} from "../../../shared/stores/photoStore";
import {
  useAuthorizedUser,
  useIsAdmin,
} from "../../../shared/stores/userStore";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage/ErrorMessage";
import type { IPhotoInput } from "../../../shared/interfaces";

function PhotoFormPage() {
  const navigate = useNavigate();
  const session = useAuthorizedUser();
  const isAdmin = useIsAdmin();
  const isEditMode = Boolean(useMatch(ROUTES.PICTURE_EDIT));
  const { pictureId } = useParams<PathParams[typeof ROUTES.PICTURE_EDIT]>();
  const { photo, loading, error } = usePhoto(
    isEditMode ? pictureId : undefined,
  );

  if (!session) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  if (!isAdmin) {
    return (
      <ErrorMessage error="Создание и редактирование доступно только администраторам" />
    );
  }

  if (isEditMode) {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error || !photo) {
      return <ErrorMessage error={error ?? "Фотография не найдена"} />;
    }

    if (!canManagePhoto(photo, session.id)) {
      return (
        <ErrorMessage error="У вас нет прав для редактирования этой публикации" />
      );
    }
  }

  const handleSubmit = async (data: IPhotoInput) => {
    if (isEditMode && pictureId) {
      const success = updatePhoto(Number(pictureId), data, session.id);

      if (success) {
        navigate(generatePath(ROUTES.PICTURE, { pictureId }));
        return true;
      }

      return false;
    }

    const created = createPhoto(data, session.id);
    navigate(generatePath(ROUTES.PICTURE, { pictureId: String(created.id) }));
    return true;
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: "primary.main", display: "block", mb: 1 }}
          >
            {isEditMode ? "Редактирование" : "Новая публикация"}
          </Typography>

          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, mb: 3 }}
          >
            {isEditMode ? "Редактировать фото" : "Создать публикацию"}
          </Typography>

          <PhotoForm
            defaultValues={
              isEditMode && photo
                ? {
                    title: photo.title,
                    description: photo.description ?? "",
                    author: photo.author ?? session.email,
                  }
                : {
                    title: "",
                    description: "",
                    author: session.email,
                  }
            }
            submitLabel={isEditMode ? "Сохранить изменения" : "Опубликовать"}
            onSubmit={handleSubmit}
            onCancel={() =>
              isEditMode && pictureId
                ? navigate(generatePath(ROUTES.PICTURE, { pictureId }))
                : navigate(ROUTES.CATALOG)
            }
          />
        </Paper>
      </Container>
    </Box>
  );
}

export const Component = PhotoFormPage;

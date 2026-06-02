import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { type PathParams, ROUTES } from "../../../shared/routes/routes.ts";
import { usePhoto } from "../hooks/usePhoto";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage/ErrorMessage";
import { getReliableImageUrl } from "../../../shared/utils/imageHelpers";
import { canManagePhoto, deletePhoto } from "../../../shared/stores/photoStore";
import { useAuthorizedUser } from "../../../shared/stores/userStore";

function PicturePage() {
  const { pictureId } = useParams<PathParams[typeof ROUTES.PICTURE]>();
  const { photo, author, loading, error } = usePhoto(pictureId);
  const session = useAuthorizedUser();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [prevPhotoId, setPrevPhotoId] = useState(photo?.id);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (photo?.id !== prevPhotoId) {
    setPrevPhotoId(photo?.id);
    setImgError(false);
  }

  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='%23666'%3EФото не загружено%3C/text%3E%3C/svg%3E";

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !photo) {
    return <ErrorMessage error={error ?? "Фотография не найдена"} />;
  }

  const imageUrl = getReliableImageUrl(photo.id);
  const canManage = session?.id && canManagePhoto(photo, session.id);
  const description = photo.description ?? photo.title;

  const handleDelete = () => {
    if (!session || !pictureId) {
      return;
    }

    const success = deletePhoto(Number(pictureId), session.id);

    if (success) {
      navigate(ROUTES.CATALOG);
    }
  };

  return (
    <main>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Box
            component="img"
            src={imgError ? fallbackImage : imageUrl}
            alt={photo.title}
            onError={() => setImgError(true)}
            sx={{
              width: "100%",
              maxHeight: 520,
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />

          <Stack spacing={2}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              {photo.title}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>

            {author && (
              <Typography variant="subtitle1">
                Автор:{" "}
                <Box component="span" sx={{ fontWeight: 600 }}>
                  {author}
                </Box>
              </Typography>
            )}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                variant="outlined"
                onClick={() => navigate(ROUTES.CATALOG)}
              >
                Смотреть ещё
              </Button>

              {canManage && (
                <>
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate(
                        generatePath(ROUTES.PICTURE_EDIT, {
                          pictureId: String(photo.id),
                        }),
                      )
                    }
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    Удалить
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Удалить публикацию?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Публикация «{photo.title}» будет удалена без возможности
            восстановления.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Отмена</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

export const Component = PicturePage;

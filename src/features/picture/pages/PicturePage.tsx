import { useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { type PathParams, ROUTES } from "../../../shared/routes/routes.ts";
import { usePhoto } from "../hooks/usePhoto";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage/ErrorMessage";
import { getReliableImageUrl } from "../../../shared/utils/imageHelpers";

function PicturePage() {
  const { pictureId } = useParams<PathParams[typeof ROUTES.PICTURE]>();
  const { photo, author, loading, error } = usePhoto(pictureId);
  const [imgError, setImgError] = useState(false);

  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='%23666'%3EФото не загружено%3C/text%3E%3C/svg%3E";

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !photo) {
    return <ErrorMessage error={error ?? "Фотография не найдена"} />;
  }

  const imageUrl = getReliableImageUrl(photo.id);

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
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
              Проект #{photo.id}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {photo.title}
            </Typography>

            {author && (
              <Typography variant="subtitle1" component="h3">
                Автор:{" "}
                <Box component="span" sx={{ fontWeight: 600 }}>
                  {author}
                </Box>
              </Typography>
            )}
          </Stack>
        </Stack>
      </Container>
    </main>
  );
}

export const Component = PicturePage;

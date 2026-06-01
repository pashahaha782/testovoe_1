import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { PhotoCard } from "../components/PhotoCard.tsx";
import { fetchPhotos } from "../api";
import type { Photo } from "../../../shared/interfaces";

function CatalogPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotos(20);
        setPhotos(data);
      } catch {
        setError("Не удалось загрузить фотографии");
      } finally {
        setLoading(false);
      }
    };

    void loadPhotos();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <main>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box component="section" sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Каталог фотографий
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Коллекция лучших работ
          </Typography>
        </Box>

        <Box component="section" aria-label="Галерея фотографий">
          <Grid
            container
            spacing={3}
            component="ul"
            sx={{ listStyle: "none", p: 0 }}
          >
            {photos.map((photo) => (
              <li key={photo.id}>
                <PhotoCard photo={photo} />
              </li>
            ))}
          </Grid>
        </Box>
      </Container>
    </main>
  );
}

export const Component = CatalogPage;

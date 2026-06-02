import { Box, Grid, Typography } from "@mui/material";
import { PhotoCard } from "./PhotoCard";
import type { Photo } from "../../../shared/interfaces";

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
  subtitle?: string;
}

export function PhotoGallery({ photos, title, subtitle }: PhotoGalleryProps) {
  if (!photos.length) return null;

  return (
    <Box
      component="section"
      aria-label="Галерея фотографий"
      sx={{ mb: 6, scrollMarginTop: "64px" }}
      id="gallery"
    >
      {title && (
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      <Grid
        container
        component="ul"
        sx={{
          listStyle: "none",
          p: 0,
          justifyContent: "space-between",
        }}
      >
        {photos.map((photo) => (
          <Box
            component="li"
            key={photo.id}
            sx={{
              width: {
                xs: "100%",
                md: "calc(50% - 8px)",
              },
              mb: 3,
            }}
          >
            <PhotoCard photo={photo} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

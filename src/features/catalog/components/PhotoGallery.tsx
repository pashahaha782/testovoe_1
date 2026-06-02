import { Box, Grid, Typography } from "@mui/material";
import { PhotoCard } from "./PhotoCard";
import type { Photo } from "../../../shared/interfaces";
import { useRef } from "react";

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
  subtitle?: string;
}

export function PhotoGallery({ photos, title, subtitle }: PhotoGalleryProps) {
  const galleryRef = useRef<HTMLElement>(null);

  if (!photos.length) return null;

  return (
    <Box
      component="section"
      aria-label="Галерея фотографий"
      sx={{ mb: 6, scrollMarginTop: "64px" }}
      ref={galleryRef}
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
  );
}

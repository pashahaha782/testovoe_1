import { Box } from "@mui/material";
import { PhotoCard } from "./PhotoCard";
import { SectionHeading } from "./SectionHeading";
import type { Photo } from "../../../shared/interfaces";

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
  subtitle?: string;
}

const COLUMN_VARIANTS = [8, 4, 4, 4, 6, 6, 4, 4, 4, 5, 7, 12] as const;

const getColumnSpan = (photoId: number): number => {
  const index = Math.abs(photoId) % COLUMN_VARIANTS.length;
  return COLUMN_VARIANTS[index];
};

export function PhotoGallery({ photos, title, subtitle }: PhotoGalleryProps) {
  if (!photos.length) return null;

  return (
    <Box
      component="section"
      aria-label="Галерея фотографий"
      sx={{ scrollMarginTop: "80px" }}
      id="gallery"
    >
      {title && (
        <SectionHeading label="Каталог" title={title} subtitle={subtitle} />
      )}

      <Box
        component="ul"
        sx={{
          listStyle: "none",
          p: 0,
          m: 0,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
          gap: { xs: 2, md: 2.5 },
        }}
      >
        {photos.map((photo) => {
          const colSpan = getColumnSpan(photo.id);
          return (
            <Box
              component="li"
              key={photo.id}
              sx={{
                gridColumn: { md: `span ${colSpan}` },
              }}
            >
              <PhotoCard photo={photo} tall={false} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

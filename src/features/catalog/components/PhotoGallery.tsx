import { Box } from "@mui/material";
import { PhotoCard } from "./PhotoCard";
import { SectionHeading } from "./SectionHeading";
import type { Photo } from "../../../shared/interfaces";

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
  subtitle?: string;
}

const BENTO_SPANS = [
  { col: 8, row: 1 },
  { col: 4, row: 1 },
  { col: 4, row: 1 },
  { col: 4, row: 1 },
  { col: 6, row: 1 },
  { col: 6, row: 1 },
  { col: 4, row: 1 },
  { col: 4, row: 1 },
  { col: 4, row: 1 },
  { col: 5, row: 1 },
  { col: 7, row: 1 },
  { col: 12, row: 1 },
] as const;

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
          gridAutoRows: { xs: "auto", md: "minmax(200px, auto)" },
          gap: { xs: 2, md: 2.5 },
        }}
      >
        {photos.map((photo, index) => {
          const span = BENTO_SPANS[index % BENTO_SPANS.length];

          return (
            <Box
              component="li"
              key={photo.id}
              sx={{
                gridColumn: { md: `span ${span.col}` },
                gridRow: { md: `span ${span.row}` },
                minHeight: { md: span.row > 1 ? 420 : 200 },
              }}
            >
              <PhotoCard photo={photo} tall={span.row > 1} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

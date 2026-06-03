import Masonry from "react-masonry-css";
import { Box } from "@mui/material";
import { PhotoCard } from "./PhotoCard";
import { SectionHeading } from "./SectionHeading";
import type { IPhoto } from "../../../shared/interfaces";
import "./PhotoGallery.css";

interface PhotoGalleryProps {
  photos: IPhoto[];
  title?: string;
  subtitle?: string;
}

const BREAKPOINT_COLUMNS = {
  default: 3,
  1200: 2,
  768: 1,
};

const MASONRY_HEIGHTS = [280, 360, 320, 500, 300, 340];

const getImageHeight = (photoId: number): number => {
  const index = Math.abs(photoId) % MASONRY_HEIGHTS.length;
  return MASONRY_HEIGHTS[index];
};

export function PhotoGallery({ photos, title, subtitle }: PhotoGalleryProps) {
  if (!photos.length) {
    return null;
  }

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

      <Masonry
        breakpointCols={BREAKPOINT_COLUMNS}
        className="photo-gallery__masonry"
        columnClassName="photo-gallery__masonry-column"
      >
        {photos.map((photo) => (
          <Box component="div" key={photo.id}>
            <PhotoCard photo={photo} imageHeight={getImageHeight(photo.id)} />
          </Box>
        ))}
      </Masonry>
    </Box>
  );
}

import { useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import type { Photo } from "../../../shared/interfaces";
import { getReliableImageUrl } from "../../../shared/utils/imageHelpers";

interface PhotoCardProps {
  photo: Photo;
}

export function PhotoCard({ photo }: PhotoCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getReliableImageUrl(photo.id);

  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='%23666'%3EФото не загружено%3C/text%3E%3C/svg%3E";

  const handleError = () => {
    setImgError(true);
  };

  return (
    <article>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={imgError ? fallbackImage : imageUrl}
          alt={photo.title}
          onError={handleError}
          sx={{ objectFit: "cover" }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 120,
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: 60,
            }}
          >
            {photo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Проект #{photo.id}
          </Typography>
        </CardContent>
      </Card>
    </article>
  );
}

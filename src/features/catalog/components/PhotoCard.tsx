import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import type { Photo } from "../../../shared/interfaces";
import { getReliableImageUrl } from "../../../shared/utils/imageHelpers.ts";

interface PhotoCardProps {
  photo: Photo;
}

export function PhotoCard({ photo }: PhotoCardProps) {
  const imageUrl = getReliableImageUrl(photo.id);

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
        onClick={() => {
          console.log(`Открыть проект ${photo.id}`);
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={imageUrl}
          alt={photo.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom>
            {photo.title.length > 60
              ? `${photo.title.substring(0, 60)}...`
              : photo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Проект #{photo.id}
          </Typography>
        </CardContent>
      </Card>
    </article>
  );
}

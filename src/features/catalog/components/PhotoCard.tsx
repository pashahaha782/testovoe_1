import { useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { href, useNavigate } from "react-router-dom";
import type { IPhoto } from "../../../shared/interfaces";
import { ROUTES } from "../../../shared/routes/routes";
import { getReliableImageUrl } from "../../../shared/utils/imageHelpers";

interface PhotoCardProps {
  photo: IPhoto;
  tall?: boolean;
  imageHeight?: number;
  onClick?: () => void;
}

export function PhotoCard({
  photo,
  tall = false,
  imageHeight,
  onClick,
}: PhotoCardProps) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const imageUrl = getReliableImageUrl(photo.id);

  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23222222'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='%23888888'%3EФото не загружено%3C/text%3E%3C/svg%3E";

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    navigate(href(ROUTES.PICTURE, { pictureId: String(photo.id) }));
  };

  return (
    <article style={{ height: tall ? "100%" : undefined, width: "100%" }}>
      <Card
        onClick={handleClick}
        sx={{
          width: "100%",
          height: tall ? "100%" : "auto",
          minHeight: tall ? 280 : undefined,
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          cursor: "pointer",
          border: "1px solid",
          borderColor: "divider",
          transition: "box-shadow 0.35s ease",
          "&:hover": {
            boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
            "& .photo-card__image": {
              transform: "scale(1.08)",
            },
            "& .photo-card__cta": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            height:
              imageHeight ?? (tall ? "100%" : { xs: 260, sm: 280, md: 300 }),
            minHeight: tall ? 280 : undefined,
          }}
        >
          <Box
            className="photo-card__image"
            component="img"
            src={imgError ? fallbackImage : imageUrl}
            alt={photo.title}
            onError={() => setImgError(true)}
            sx={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              transformOrigin: "center center",
            }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0.88) 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 2.5,
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: "primary.light", mb: 0.5, lineHeight: 1.2 }}
          >
            {photo.isLocal ? "Моя публикация" : `Проект #${photo.id}`}
          </Typography>

          <Typography
            variant="h6"
            component="h3"
            sx={{
              color: "common.white",
              fontWeight: 600,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.35,
              mb: 1,
            }}
          >
            {photo.title}
          </Typography>

          <Box
            className="photo-card__cta"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "primary.light",
              opacity: { xs: 1, md: 0 },
              transform: { xs: "none", md: "translateY(8px)" },
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Открыть
            </Typography>
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </Card>
    </article>
  );
}

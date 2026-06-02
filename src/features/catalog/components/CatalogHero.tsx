import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { Photo } from "../../../shared/interfaces";
import { getReliableImageUrl } from "../../../shared/utils/imageHelpers";

interface CatalogHeroProps {
  photo?: Photo;
  photoCount: number;
}

export function CatalogHero({ photo, photoCount }: CatalogHeroProps) {
  const imageUrl = photo ? getReliableImageUrl(photo.id) : undefined;

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      component="section"
      aria-label="Главный баннер каталога"
      sx={{
        position: "relative",
        minHeight: { xs: 480, md: 560 },
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        mb: { xs: 4, md: 6 },
      }}
    >
      {imageUrl && (
        <Box
          component="img"
          src={imageUrl}
          alt=""
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scale(1.02)",
          }}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(15,15,15,0.25) 0%, rgba(15,15,15,0.55) 45%, rgba(15,15,15,0.92) 100%)",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          pb: { xs: 5, md: 7 },
          pt: { xs: 10, md: 12 },
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: 720 }}>
          <Typography
            variant="overline"
            sx={{ color: "primary.light", display: "block" }}
          >
            PhotoSphere · Коллекция лучших фотографий
          </Typography>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "common.white",
              fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
              lineHeight: 1.05,
            }}
          >
            Мир через объектив
          </Typography>

          <Typography
            variant="h6"
            component="span"
            sx={{
              color: "rgba(255,255,255,0.78)",
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: 540,
            }}
          >
            Личные работы фотографов: от необычных пейзажей до интересных
            городских уголков
          </Typography>

          <Stack direction="row" spacing={4} sx={{ pt: 1 }}>
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "common.white", fontWeight: 700 }}
              >
                {photoCount}+
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.6)" }}
              >
                работ в каталоге
              </Typography>
            </Box>
            <Box
              sx={{
                width: 1,
                backgroundColor: "rgba(255,255,255,0.2)",
                alignSelf: "stretch",
              }}
            />
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "common.white", fontWeight: 700 }}
              >
                7
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.6)" }}
              >
                избранных проектов
              </Typography>
            </Box>
          </Stack>

          <Box>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowDownwardIcon />}
              onClick={scrollToGallery}
              sx={{
                mt: 1,
                px: 3.5,
                py: 1.25,
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                "&:hover": { backgroundColor: "primary.dark" },
              }}
            >
              Смотреть коллекцию
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

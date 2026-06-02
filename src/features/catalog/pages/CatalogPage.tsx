import { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";
import { PhotoGallery } from "../components/PhotoGallery";
import { FeaturedSlider } from "../components/FeaturedSlider";
import { LightboxGallery } from "../components/LightboxGallery";
import { useCatalogPhotos } from "../hooks/useCatalogPhotos";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage/ErrorMessage";
import { useFeaturedPhotos } from "../hooks/useFeaturedPhotos";
import { ROUTES } from "../../../shared/routes/routes";
import { useIsAdmin } from "../../../shared/stores/userStore";

function CatalogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const catalogPhotos = useCatalogPhotos(12);
  const featuredPhotos = useFeaturedPhotos(7);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLoading = catalogPhotos.loading || featuredPhotos.loading;
  const error = catalogPhotos.error ?? featuredPhotos.error;

  useEffect(() => {
    if (!location.hash || isLoading) {
      return;
    }

    const sectionId = location.hash.slice(1);
    const timeoutId = window.setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash, isLoading]);

  const handleFeaturedClick = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
      }}
    >
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage error={error} />}

      {!isLoading && !error && (
        <>
          <Container maxWidth="xl" sx={{ pb: { xs: 5, md: 8 } }}>
            {isAdmin && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: 3,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate(ROUTES.PICTURE_CREATE)}
                >
                  Новая публикация
                </Button>
              </Box>
            )}

            <FeaturedSlider
              photos={featuredPhotos.featuredPhotos}
              title="Избранные работы"
              onPhotoClick={handleFeaturedClick}
            />

            <PhotoGallery
              photos={catalogPhotos.photos}
              title="Все фотографии"
              subtitle="Каждый кадр открывает отдельную историю"
            />
          </Container>

          <LightboxGallery
            photos={featuredPhotos.featuredPhotos}
            isOpen={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
            initialIndex={currentIndex}
          />
        </>
      )}
    </Box>
  );
}

export const Component = CatalogPage;

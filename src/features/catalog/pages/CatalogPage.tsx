import { useState } from "react";
import { Container } from "@mui/material";
import { PhotoGallery } from "../components/PhotoGallery";
import { FeaturedSlider } from "../components/FeaturedSlider";
import { LightboxGallery } from "../components/LightboxGallery";
import { useCatalogPhotos } from "../hooks/useCatalogPhotos";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage/ErrorMessage";
import { useFeaturedPhotos } from "../hooks/useFeaturedPhotos";

function CatalogPage() {
  const catalogPhotos = useCatalogPhotos(12);
  const featuredPhotos = useFeaturedPhotos(7);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFeaturedClick = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <main>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {catalogPhotos.loading && <LoadingSpinner />}
        {catalogPhotos.error && <ErrorMessage error={catalogPhotos.error} />}
        {!catalogPhotos.loading && !catalogPhotos.error && (
          <PhotoGallery
            photos={catalogPhotos.photos}
            title="Все фотографии"
            subtitle="Коллекция лучших работ"
          />
        )}

        {featuredPhotos.loading && <LoadingSpinner />}
        {featuredPhotos.error && <ErrorMessage error={featuredPhotos.error} />}
        {!featuredPhotos.loading && !featuredPhotos.error && (
          <FeaturedSlider
            photos={featuredPhotos.featuredPhotos}
            title="Избранные работы"
            onPhotoClick={handleFeaturedClick}
          />
        )}
      </Container>

      {!featuredPhotos.loading && !featuredPhotos.error && (
        <LightboxGallery
          photos={featuredPhotos.featuredPhotos}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          initialIndex={currentIndex}
        />
      )}
    </main>
  );
}

export const Component = CatalogPage;

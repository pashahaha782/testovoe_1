import { Container } from "@mui/material";
import { PhotoGallery } from "../components/PhotoGallery";
import { useCatalogPhotos } from "../hooks/useCatalogPhotos";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner/LoadingSpinner.tsx";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage/ErrorMessage.tsx";

function CatalogPage() {
  const { photos, loading, error } = useCatalogPhotos(12);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <main>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <PhotoGallery
          photos={photos}
          title="Каталог фотографий"
          subtitle="Коллекция лучших работ"
        />
      </Container>
    </main>
  );
}

export const Component = CatalogPage;

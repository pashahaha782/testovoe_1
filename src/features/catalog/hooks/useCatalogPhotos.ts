import { useEffect, useState } from "react";
import { fetchPhotos } from "../api";
import type { Photo } from "../../../shared/interfaces";

interface UseCatalogPhotosResult {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

export const useCatalogPhotos = (
  limit: number = 12,
): UseCatalogPhotosResult => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotos(limit);
        setPhotos(data);
      } catch {
        setError("Не удалось загрузить фотографии");
      } finally {
        setLoading(false);
      }
    };

    void loadPhotos();
  }, []);

  return { photos, loading, error };
};

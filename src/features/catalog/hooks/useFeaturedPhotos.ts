import { useEffect, useState } from "react";
import { fetchPhotos } from "../api";
import type { Photo } from "../../../shared/interfaces";

interface UseFeaturedPhotosResult {
  featuredPhotos: Photo[];
  loading: boolean;
  error: string | null;
}

export const useFeaturedPhotos = (
  limit: number = 7,
): UseFeaturedPhotosResult => {
  const [featuredPhotos, setFeaturedPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotos(limit);
        setFeaturedPhotos(data);
      } catch {
        setError("Не удалось загрузить фотографии");
      } finally {
        setLoading(false);
      }
    };

    void loadPhotos();
  }, []);

  return { featuredPhotos, loading, error };
};

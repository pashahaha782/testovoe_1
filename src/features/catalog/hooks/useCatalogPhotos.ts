import { useEffect, useMemo, useState } from "react";
import { fetchPhotos } from "../api";
import type { Photo } from "../../../shared/interfaces";
import { usePhotoStore } from "../../../shared/stores/photoStore";
import { mergePhotos } from "../../../shared/utils/photoMerge";

interface UseCatalogPhotosResult {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

export const useCatalogPhotos = (
  limit: number = 12,
): UseCatalogPhotosResult => {
  const [seedPhotos, setSeedPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const createdPhotos = usePhotoStore((state) => state.createdPhotos);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotos(limit);
        setSeedPhotos(data);
      } catch {
        setError("Не удалось загрузить фотографии");
      } finally {
        setLoading(false);
      }
    };

    void loadPhotos();
  }, [limit]);

  const photos = useMemo(
    () => mergePhotos(seedPhotos, createdPhotos, {}, []),
    [seedPhotos, createdPhotos],
  );

  return { photos, loading, error };
};

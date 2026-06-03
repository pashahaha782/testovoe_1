import { useEffect, useMemo, useState } from "react";
import { fetchPhotos } from "../api";
import type { IPhoto } from "../../../shared/interfaces";
import { usePhotoStore } from "../../../shared/stores/photoStore";
import { mergePhotos } from "../../../shared/utils/photoMerge";

interface UseFeaturedPhotosResult {
  featuredPhotos: IPhoto[];
  loading: boolean;
  error: string | null;
}

export const useFeaturedPhotos = (
  limit: number = 7,
): UseFeaturedPhotosResult => {
  const [seedPhotos, setSeedPhotos] = useState<IPhoto[]>([]);
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

  const featuredPhotos = useMemo(() => {
    const merged = mergePhotos(seedPhotos, createdPhotos, {}, []);
    return merged.slice(0, limit);
  }, [seedPhotos, createdPhotos, limit]);

  return { featuredPhotos, loading, error };
};

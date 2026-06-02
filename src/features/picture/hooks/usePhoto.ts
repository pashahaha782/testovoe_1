import { useEffect, useState } from "react";
import type { Photo } from "../../../shared/interfaces";
import { fetchPhotoAuthor, fetchPhotoById } from "../api";

interface UsePhotoResult {
  photo: Photo | null;
  author: string | null;
  loading: boolean;
  error: string | null;
}

const isValidPictureId = (pictureId: string | undefined): pictureId is string =>
  pictureId != null && pictureId !== "" && !Number.isNaN(Number(pictureId));

export const usePhoto = (pictureId: string | undefined): UsePhotoResult => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isValidPictureId(pictureId)) {
      return;
    }

    let cancelled = false;

    const loadPhoto = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPhotoById(Number(pictureId));
        const authorName = await fetchPhotoAuthor(data.albumId);

        if (!cancelled) {
          setPhoto(data);
          setAuthor(authorName);
        }
      } catch {
        if (!cancelled) {
          setPhoto(null);
          setAuthor(null);
          setError("Не удалось загрузить фотографию");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadPhoto();

    return () => {
      cancelled = true;
    };
  }, [pictureId]);

  if (!isValidPictureId(pictureId)) {
    return {
      photo: null,
      author: null,
      loading: false,
      error: "Фотография не найдена",
    };
  }

  return { photo, author, loading, error };
};

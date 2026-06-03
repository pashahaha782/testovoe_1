import { useEffect, useState } from "react";
import { fetchPhotoAuthor, fetchPhotoById } from "../api";
import type { IPhoto } from "../../../shared/interfaces";
import { usePhotoStore } from "../../../shared/stores/photoStore";
import { findLocalPhoto } from "../../../shared/utils/photoMerge";

interface UsePhotoResult {
  photo: IPhoto | null;
  author: string | null;
  loading: boolean;
  error: string | null;
}

const isValidPictureId = (pictureId: string | undefined): pictureId is string =>
  pictureId != null && pictureId !== "" && !Number.isNaN(Number(pictureId));

export const usePhoto = (pictureId: string | undefined): UsePhotoResult => {
  const createdPhotos = usePhotoStore((state) => state.createdPhotos);
  const [remotePhoto, setRemotePhoto] = useState<IPhoto | null>(null);
  const [remoteAuthor, setRemoteAuthor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isValid = isValidPictureId(pictureId);
  const numericId = isValid ? Number(pictureId) : null;
  const localPhoto =
    numericId != null ? findLocalPhoto(numericId, createdPhotos) : undefined;

  useEffect(() => {
    if (!isValid || numericId == null || localPhoto) {
      return;
    }

    let cancelled = false;

    const loadPhoto = async () => {
      try {
        setLoading(true);
        setError(null);
        setRemotePhoto(null);
        setRemoteAuthor(null);

        const data = await fetchPhotoById(numericId);
        const authorName = await fetchPhotoAuthor(data.albumId);

        if (!cancelled) {
          setRemotePhoto(data);
          setRemoteAuthor(authorName);
        }
      } catch {
        if (!cancelled) {
          setRemotePhoto(null);
          setRemoteAuthor(null);
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
  }, [isValid, numericId, localPhoto]);

  if (!isValid) {
    return {
      photo: null,
      author: null,
      loading: false,
      error: "Фотография не найдена",
    };
  }

  if (localPhoto) {
    return {
      photo: localPhoto,
      author: localPhoto.author ?? null,
      loading: false,
      error: null,
    };
  }

  return {
    photo: remotePhoto,
    author: remoteAuthor,
    loading,
    error,
  };
};

import type { Photo } from "../interfaces";

export function mergePhotos(
  seedPhotos: Photo[],
  createdPhotos: Photo[],
  editedPhotos: Record<number, Photo>,
  deletedIds: number[],
): Photo[] {
  const deletedSet = new Set(deletedIds);

  const mergedSeed = seedPhotos
    .filter((photo) => !deletedSet.has(photo.id))
    .map((photo) => editedPhotos[photo.id] ?? photo);

  return [...createdPhotos, ...mergedSeed];
}

export function findLocalPhoto(
  photoId: number,
  createdPhotos: Photo[],
): Photo | undefined {
  return createdPhotos.find((photo) => photo.id === photoId);
}

import type { IPhoto } from "../interfaces";

export function mergePhotos(
  seedPhotos: IPhoto[],
  createdPhotos: IPhoto[],
  editedPhotos: Record<number, IPhoto>,
  deletedIds: number[],
): IPhoto[] {
  const deletedSet = new Set(deletedIds);

  const mergedSeed = seedPhotos
    .filter((photo) => !deletedSet.has(photo.id))
    .map((photo) => editedPhotos[photo.id] ?? photo);

  return [...createdPhotos, ...mergedSeed];
}

export function findLocalPhoto(
  photoId: number,
  createdPhotos: IPhoto[],
): IPhoto | undefined {
  return createdPhotos.find((photo) => photo.id === photoId);
}

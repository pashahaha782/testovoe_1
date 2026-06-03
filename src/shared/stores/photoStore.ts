import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { IPhoto, IPhotoInput } from "../interfaces";

interface PhotoStoreState {
  createdPhotos: IPhoto[];
  nextLocalId: number;
}

interface PhotoStoreActions {
  createPhoto: (input: IPhotoInput, userId: string) => IPhoto;
  updatePhoto: (id: number, input: IPhotoInput, userId: string) => boolean;
  deletePhoto: (id: number, userId: string) => boolean;
  canManagePhoto: (photo: IPhoto, userId: string) => boolean;
}

type PhotoStore = PhotoStoreState & PhotoStoreActions;

const initialState: PhotoStoreState = {
  createdPhotos: [],
  nextLocalId: -1,
};

const photoStore: StateCreator<PhotoStore> = (set, get) => ({
  ...initialState,

  createPhoto: (input, userId) => {
    const id = get().nextLocalId;
    const photo: IPhoto = {
      id,
      albumId: 0,
      title: input.title,
      description: input.description,
      author: input.author,
      userId,
      isLocal: true,
      url: "",
      thumbnailUrl: "",
    };

    set((state) => ({
      createdPhotos: [photo, ...state.createdPhotos],
      nextLocalId: state.nextLocalId - 1,
    }));

    return photo;
  },

  updatePhoto: (id, input, userId) => {
    const { createdPhotos } = get();
    const index = createdPhotos.findIndex(
      (photo) => photo.id === id && photo.userId === userId,
    );

    if (index === -1) {
      return false;
    }

    const updatedPhotos = [...createdPhotos];
    updatedPhotos[index] = {
      ...updatedPhotos[index],
      title: input.title,
      description: input.description,
      author: input.author,
    };

    set({ createdPhotos: updatedPhotos });
    return true;
  },

  deletePhoto: (id, userId) => {
    const { createdPhotos } = get();
    const photo = createdPhotos.find(
      (item) => item.id === id && item.userId === userId,
    );

    if (!photo) {
      return false;
    }

    set({
      createdPhotos: createdPhotos.filter((item) => item.id !== id),
    });

    return true;
  },

  canManagePhoto: (photo, userId) =>
    photo.isLocal === true && photo.userId === userId,
});

export const usePhotoStore = create<PhotoStore>()(
  persist(photoStore, {
    name: "photo-storage",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      createdPhotos: state.createdPhotos,
      nextLocalId: state.nextLocalId,
    }),
  }),
);

export const createPhoto = (input: IPhotoInput, userId: string) =>
  usePhotoStore.getState().createPhoto(input, userId);

export const updatePhoto = (id: number, input: IPhotoInput, userId: string) =>
  usePhotoStore.getState().updatePhoto(id, input, userId);

export const deletePhoto = (id: number, userId: string) =>
  usePhotoStore.getState().deletePhoto(id, userId);

export const canManagePhoto = (photo: IPhoto, userId: string) =>
  usePhotoStore.getState().canManagePhoto(photo, userId);

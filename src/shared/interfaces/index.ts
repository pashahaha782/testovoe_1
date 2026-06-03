export interface IUser {
  id: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  description?: string;
  author?: string;
  userId?: string;
  isLocal?: boolean;
}

export interface IAlbum {
  userId: number;
}

export interface IPhotoInput {
  title: string;
  description: string;
  author: string;
}

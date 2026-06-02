export interface IUser {
  id: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface Photo {
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

export interface Album {
  userId: number;
}

export interface PhotoInput {
  title: string;
  description: string;
  author: string;
}

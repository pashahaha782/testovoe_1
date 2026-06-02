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
}

export interface Album {
  userId: number;
}

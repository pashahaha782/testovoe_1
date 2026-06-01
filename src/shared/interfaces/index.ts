export interface IUser {
  id: string;
  email: string;
  password: string;
}

export interface IAuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface IInitialState {
  user: IUser | null;
  isAuthenticated: boolean;
  users: IUser[];
}

export interface IAuthState extends IInitialState, IAuthActions {}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

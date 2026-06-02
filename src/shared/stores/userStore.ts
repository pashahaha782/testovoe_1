import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { IUser } from "../interfaces";

const MOCK_USERS: IUser[] = [
  {
    id: "1",
    email: "anna@photographer.com",
    password: "anna123",
    isAdmin: true,
  },
  {
    id: "2",
    email: "mike@photographer.com",
    password: "mike123",
    isAdmin: true,
  },
  {
    id: "3",
    email: "elena@photographer.com",
    password: "elena123",
    isAdmin: true,
  },
  {
    id: "4",
    email: "admin@photographer.com",
    password: "admin123",
    isAdmin: true,
  },
];

interface IAuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface IInitialState {
  user: IUser | null;
  isAuthenticated: boolean;
  users: IUser[];
}

interface IAuthState extends IInitialState, IAuthActions {}

const initialState: IInitialState = {
  user: null,
  isAuthenticated: false,
  users: MOCK_USERS,
};

const userStore: StateCreator<IAuthState> = (set, get) => ({
  ...initialState,

  login: async (email: string, password: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = get().users.find(
          (item) => item.email === email && item.password === password,
        );

        if (user) {
          set({
            user,
            isAuthenticated: true,
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },

  register: async (email: string, password: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = get().users;
        const exists = users.some((item) => item.email === email);

        if (exists) {
          resolve(false);
        } else {
          const newUser: IUser = {
            id: Date.now().toString(),
            email,
            password,
            isAdmin: false,
          };

          const updatedUsers = [...users, newUser];
          set({
            users: updatedUsers,
            user: newUser,
            isAuthenticated: true,
          });
          resolve(true);
        }
      }, 500);
    });
  },

  logout: () => {
    set(initialState);
  },
});

export const useAuthStore = create<IAuthState>()(
  persist(userStore, {
    name: "auth-storage",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      users: state.users,
    }),
  }),
);

export const useAuthorizedUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsAdmin = () =>
  useAuthStore((state) => state.user?.isAdmin === true);

export const login = (email: string, password: string) =>
  useAuthStore.getState().login(email, password);

export const register = (email: string, password: string) =>
  useAuthStore.getState().register(email, password);

export const logout = () => useAuthStore.getState().logout();

import axios from "axios";
import type { Album, Photo } from "../../../shared/interfaces";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPhotoById = async (id: number): Promise<Photo> => {
  const response = await axios.get(`${API_URL}/photos/${id}`);
  return response.data;
};

export const fetchPhotoAuthor = async (albumId: number): Promise<string> => {
  const albumResponse = await axios.get<Album>(`${API_URL}/albums/${albumId}`);
  const userResponse = await axios.get<{ name: string }>(
    `${API_URL}/users/${albumResponse.data.userId}`,
  );
  return userResponse.data.name;
};

import axios from "axios";
import type { Photo } from "../../../shared/interfaces";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPhotos = async (limit: number = 12): Promise<Photo[]> => {
  const response = await axios.get(`${API_URL}/photos?_limit=${limit}`);
  return response.data;
};

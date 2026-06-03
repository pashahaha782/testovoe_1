import axios from "axios";
import type { IPhoto } from "../../../shared/interfaces";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPhotos = async (limit: number = 12): Promise<IPhoto[]> => {
  const response = await axios.get(`${API_URL}/photos?_limit=${limit}`);
  return response.data;
};

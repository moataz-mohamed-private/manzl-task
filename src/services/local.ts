import axios from "axios";
import { ContentType } from "~/types/localApi";

export const addToFav = async (tmdbId: number, type: ContentType) => {
  return axios.post("/api/favorites", { tmdbId: tmdbId, type: type });
};
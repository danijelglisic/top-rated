import axios, { AxiosError } from "axios";

const API_URL = `https://api.themoviedb.org`;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;

const apiClient = axios.create({
  baseURL: `${API_URL}/${API_VERSION}`,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export default apiClient;

export type MediaType = "Movie" | "TVShow";

type MediaEndpointsType = {
  [key in MediaType]: string;
};

const mediaDiscoverEndpoints: MediaEndpointsType = {
  Movie: "/discover/movie",
  TVShow: "/discover/tv",
};

export const getTopRated = async <T>(type: MediaType) => {
  const params = {
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page: "1",
    sort_by: "vote_average.desc",
    without_genres: "99,10755",
    vote_count: { gte: "200" },
  };

  try {
    const response = await apiClient.get(mediaDiscoverEndpoints[type], {
      params,
    });

    return response.data as T;
  } catch (error: any) {
    if (error.isAxiosError) {
      const axiosError = error as AxiosError;
      console.error("Axios error:", axiosError.message);
    } else {
      console.error("Error:", error);
    }
    throw new Error("Something went wrong. Please try refreshing the page.");
  }
};

const mediaSearchEndpoints: MediaEndpointsType = {
  Movie: "/search/movie",
  TVShow: "/search/tv",
};

export const searchMedia = async <T>(type: MediaType, query: string) => {
  try {
    const response = await apiClient.get(mediaSearchEndpoints[type], {
      params: {
        query,
      },
    });

    return response.data as T;
  } catch (error: any) {
    if (error.isAxiosError) {
      const axiosError = error as AxiosError;
      console.error("Axios error:", axiosError.message);
    } else {
      console.error("Error:", error);
    }
    throw new Error("Something went wrong. Please try refreshing the page.");
  }
};

const getMediaEndpoints: MediaEndpointsType = {
  Movie: "/movie/",
  TVShow: "/tv/",
};

export const getMediaById = async <T>(id: string, type: MediaType) => {
  const params = {
    language: "en-US",
  };

  try {
    const response = await apiClient.get(getMediaEndpoints[type] + id, {
      params,
    });

    return response.data as T;
  } catch (error: any) {
    if (error.isAxiosError) {
      const axiosError = error as AxiosError;
      console.error("Axios error:", axiosError.message);
    } else {
      console.error("Error:", error);
    }
    throw new Error("Something went wrong. Please try refreshing the page.");
  }
};

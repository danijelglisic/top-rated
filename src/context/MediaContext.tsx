import React, { createContext, useState, ReactNode, useEffect } from "react";
import { MediaType, searchMedia } from "../api";
import {
  DiscoverMovieResponseType,
  DiscoverTVShowResponseType,
  Movie,
  TVShow,
} from "../types";
import { loadMovies, loadTVShows } from "../utils/helpers";

export const NUMBER_OF_TOP_RATED = 10;
export const QUERY_MIN_LENGTH = 3;

export interface MediaContextType {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  shows: TVShow[];
  setShows: React.Dispatch<React.SetStateAction<TVShow[]>>;
  selectedMedia: MediaType;
  handleSelectMedia: (media: MediaType) => void;
  query: string;
  handleQueryChange: (query: string) => void;
  searchData: Movie[] | TVShow[];
}

export const MediaContext = createContext<MediaContextType | undefined>(
  undefined
);

export const MediaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [shows, setShows] = useState<TVShow[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaType>("Movie");
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState<Movie[] | TVShow[]>([]);

  const handleSelectMedia = (type: MediaType) => {
    setSelectedMedia(type);
    handleQueryChange(query, type);
    if (type === "Movie") {
      if (!movies.length) {
        loadMovies(setMovies);
      }
      return;
    }
    if (!shows.length) {
      loadTVShows(setShows);
    }
  };

  const handleQueryChange = async (query: string, type?: MediaType) => {
    setQuery(query);
    if (query.trim().length < QUERY_MIN_LENGTH) return;
    const response = await searchMedia<
      DiscoverMovieResponseType | DiscoverTVShowResponseType
    >(type ?? selectedMedia, query);
    if (response?.results) setSearchData(response.results);
  };

  const mediaContextValue: MediaContextType = {
    movies,
    setMovies,
    shows,
    setShows,
    selectedMedia,
    handleSelectMedia,
    query,
    handleQueryChange,
    searchData,
  };

  useEffect(() => {
    loadMovies(setMovies);
  }, []);

  return (
    <MediaContext.Provider value={mediaContextValue}>
      {children}
    </MediaContext.Provider>
  );
};

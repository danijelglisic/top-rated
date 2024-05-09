import { MediaType, getMediaById, getTopRated } from "../api";
import { NUMBER_OF_TOP_RATED } from "../context/MediaContext";
import {
  DiscoverMovieResponseType,
  DiscoverTVShowResponseType,
  Movie,
  MovieDetailsResponseType,
  TVShow,
  TVShowDetailsResponseType,
} from "../types";

export const loadMovies = async (onMoviesLoaded: (movies: Movie[]) => void) => {
  const moviesResponse = await getTopRated<DiscoverMovieResponseType>("Movie");
  if (moviesResponse?.results) {
    onMoviesLoaded(moviesResponse.results.slice(0, NUMBER_OF_TOP_RATED));
  }
};

export const loadTVShows = async (
  onTVShowsLoaded: (shows: TVShow[]) => void
) => {
  const showsResponse = await getTopRated<DiscoverTVShowResponseType>("TVShow");
  if (showsResponse?.results) {
    onTVShowsLoaded(showsResponse.results.slice(0, NUMBER_OF_TOP_RATED));
  }
};

export const loadDetails = async (
  mediaId: string,
  mediaType: MediaType,
  onDetailsLoaded: (
    movies: TVShowDetailsResponseType | MovieDetailsResponseType
  ) => void
) => {
  const response = await getMediaById<
    TVShowDetailsResponseType | MovieDetailsResponseType
  >(mediaId ?? "", mediaType);
  onDetailsLoaded(response);
};

import { operations } from "../../types-schema";

type ElementOf<T> = T extends Array<infer U> ? U : never;

export type DiscoverMovieResponseType =
  operations["discover-movie"]["responses"][200]["content"]["application/json"];

export type MoviesList = DiscoverMovieResponseType["results"];

export type Movie = ElementOf<MoviesList>;

export type DiscoverTVShowResponseType =
  operations["discover-tv"]["responses"][200]["content"]["application/json"];

export type TVShowsList = DiscoverTVShowResponseType["results"];

export type TVShow = ElementOf<TVShowsList>;

export type MovieDetailsResponseType =
  operations["movie-details"]["responses"][200]["content"]["application/json"];

export type TVShowDetailsResponseType =
  operations["tv-series-details"]["responses"][200]["content"]["application/json"];

import HeaderTabs from "../../components/HeaderTabs";
import Input from "../../components/Input";
import { useMedia } from "../../hooks/useMedia";
import MediaCards from "../../components/MediaCards";
import { QUERY_MIN_LENGTH } from "../../context/MediaContext";
import { useEffect } from "react";

export const Home = () => {
  const {
    selectedMedia,
    handleSelectMedia,
    movies,
    shows,
    query,
    handleQueryChange,
    searchData,
  } = useMedia();

  const areSelectedMovies = selectedMedia === "Movie";
  const shouldShowSearchResults = query.trim().length >= QUERY_MIN_LENGTH;

  return (
    <div className="container">
      <HeaderTabs
        selectedMedia={selectedMedia}
        onSelectMedia={handleSelectMedia}
      />
      <Input
        value={query}
        onChange={(query) => handleQueryChange(query)}
        placeholder={`Search ${areSelectedMovies ? "movies" : "TV shows"}`}
      />
      {shouldShowSearchResults ? (
        <MediaCards cards={searchData ?? []} />
      ) : (
        <MediaCards cards={areSelectedMovies ? movies : shows} />
      )}
    </div>
  );
};

export default Home;

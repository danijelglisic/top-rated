import { MediaType } from "../../api";

interface HeaderTabsProps {
  selectedMedia: MediaType;
  onSelectMedia: (media: MediaType) => void;
}

const HeaderTabs = ({ selectedMedia, onSelectMedia }: HeaderTabsProps) => {
  return (
    <header className="header">
      <div className="tabs">
        <button
          className={`tab ${selectedMedia === "Movie" ? "active" : ""}`}
          onClick={() => onSelectMedia("Movie")}
        >
          Movies
        </button>
        <button
          className={`tab ${selectedMedia === "TVShow" ? "active" : ""}`}
          onClick={() => onSelectMedia("TVShow")}
        >
          TV Shows
        </button>
      </div>
    </header>
  );
};

export default HeaderTabs;

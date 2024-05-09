import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMediaById } from "../../api";
import {
  MovieDetailsResponseType,
  TVShowDetailsResponseType,
} from "../../types";
import Loader from "../../components/Loader";
import { IMAGE_URL_BASE } from "../../components/MediaCards";
import noImage from "../../assets/no-image.png";
import { loadDetails } from "../../utils/helpers";

const MediaSinglePage = () => {
  const [mediaData, setMediaData] = useState<
    TVShowDetailsResponseType | MovieDetailsResponseType | null
  >(null);
  const { mediaId } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");
  const isMovie = type === "Movie";
  const mediaType = isMovie ? type : "TVShow";

  const imageSrc = mediaData?.backdrop_path
    ? IMAGE_URL_BASE + mediaData.backdrop_path
    : noImage;

  let title = isMovie
    ? (mediaData as MovieDetailsResponseType)?.title
    : (mediaData as TVShowDetailsResponseType)?.name;

  useEffect(() => {
    loadDetails(mediaId ?? "", mediaType, setMediaData);
  }, [loadDetails]);

  if (!mediaData) return <Loader />;

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>
        <span>
          <ChevronLeft />
        </span>
        Back
      </button>
      <div className="details-page">
        <img src={imageSrc} alt={""} className="cover-image" />
        <h1 className="title">{title}</h1>
        <p className="overview">
          {mediaData.overview ?? "No description available"}
        </p>
      </div>
    </div>
  );
};

export default MediaSinglePage;

const ChevronLeft = () => (
  <svg
    width="24px"
    height="24px"
    style={{
      marginTop: "4px",
    }}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 16a.997.997 0 01-.707-.293l-5-5a.999.999 0 010-1.414l5-5a.999.999 0 111.414 1.414L8.414 10l4.293 4.293A.999.999 0 0112 16z" />
  </svg>
);

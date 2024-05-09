import { Movie, TVShow } from "../../types";
import noImage from "../../assets/no-image.png";
import { useNavigate } from "react-router-dom";

export const IMAGE_URL_BASE = "https://image.tmdb.org/t/p/w500";

interface MediaCardsProps {
  cards: Movie[] | TVShow[];
}

const MediaCards = ({ cards }: MediaCardsProps) => {
  const navigate = useNavigate();

  return (
    <section className="cards">
      {cards.map((card) => {
        //@ts-ignore
        const title = card?.title ?? card?.name;
        let type = "Movie";
        //@ts-ignore
        if (card?.name) {
          type = "TVShow";
        }
        const imageSrc = card.poster_path
          ? IMAGE_URL_BASE + card.poster_path
          : noImage;
        return (
          <button
            onClick={() => navigate(`/media-page/${card.id}?type=${type}`)}
            key={card.id}
            className="card"
          >
            <img src={imageSrc} alt={title} />
            <div className="text">
              <h2>{title}</h2>
            </div>
          </button>
        );
      })}
    </section>
  );
};

export default MediaCards;

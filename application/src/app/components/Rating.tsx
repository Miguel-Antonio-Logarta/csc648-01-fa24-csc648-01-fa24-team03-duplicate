import StarEmpty from "./icons/StarEmpty";
import StarFull from "./icons/StarFull";
import StarHalf from "./icons/StarHalf";

type props = {
  rating: number;
  size: number;
  className: string;
};

// Renders a rating. Do not let rating exceed a value of 5
function Rating({ rating, size, className }: props) {
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - halfStars - fullStars;

  return (
    <div className={`flex flex-row no-wrap ${className}`}>
      <div className="flex flex-row no-wrap">
        {[...Array(fullStars)].map((element, index) => (
          <StarFull key={index} size={size} />
        ))}
        {[...Array(halfStars)].map((element, index) => (
          <StarHalf key={index} size={size} />
        ))}
        {[...Array(emptyStars)].map((element, index) => (
          <StarEmpty key={index} size={size} />
        ))}
      </div>
      <span className="align-bottom text-base ml-2">{rating.toFixed(1)}</span>
      {/* <span className="align-bottom text-base ml-2">{rating} (45 reviews)</span> */}
    </div>
  );
}

export default Rating;

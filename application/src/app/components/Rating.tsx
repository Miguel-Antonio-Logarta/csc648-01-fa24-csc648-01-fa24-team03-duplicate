import StarEmpty from "./icons/StarEmpty";
import StarFull from "./icons/StarFull";
import StarHalf from "./icons/StarHalf";

type props = {
  rating: number;
  size: number;
};

// Renders a rating. Do not let rating exceed a value of 5
function Rating({ rating, size }: props) {
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - halfStars - fullStars;

  return (
    <div className="flex flex-row no-wrap items-center">
      {[...Array(fullStars)].map((element, index) => (
        <StarFull key={index} size={size} />
      ))}
      {[...Array(halfStars)].map((element, index) => (
        <StarHalf key={index} size={size} />
      ))}
      {[...Array(emptyStars)].map((element, index) => (
        <StarEmpty key={index} size={size} />
      ))}
      <span>{rating}</span>
      <span>(45 reviews)</span>
    </div>
  );
}

export default Rating;

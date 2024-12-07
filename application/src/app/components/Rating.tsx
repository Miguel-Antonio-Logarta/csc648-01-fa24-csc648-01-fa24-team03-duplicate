import StarEmpty from "./icons/StarEmpty";
import StarFull from "./icons/StarFull";
import StarHalf from "./icons/StarHalf";

type props = {
  rating: number;
  size: number;
  className?: string;
  style: "full" | "compact" | "full2";
  fontSize?: number;
  fill?: string;
};

// Renders a rating. Do not let rating exceed a value of 5
function Rating({ rating, size, style, className, fontSize, fill }: props) {

  if (style === "full") {
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
  } else if (style === "compact") {
    return (
      <div className={`flex flex-row no-wrap ${className}`}>
        <StarFull size={size} />          
        <span className="align-bottom text-base ml-1">({rating.toFixed(1)})</span>
        {/* <span className="align-bottom text-base ml-2">{rating} (45 reviews)</span> */}
      </div>
    );
  } else if (style === "full2") {
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - halfStars - fullStars;
    return (
      <div className={`${className} flex items-center`}>
          {[...Array(fullStars)].map((element, index) => (
              <StarFull key={index} size={size} className="block" fill={fill ? fill : "#000000"}/>
          ))}
          {[...Array(halfStars)].map((element, index) => (
              <StarHalf key={index} size={size} className="block" fill={fill ? fill : "#000000"}/>
          ))}
          {[...Array(emptyStars)].map((element, index) => (
              <StarEmpty key={index} size={size} className="block" fill={fill ? fill : "#000000"}/>
          ))}
        <span className="block ml-2 font-josefin" style={{fontSize: fontSize || "1em", transform: "translateY(0.1rem)"}}>{rating.toFixed(1)}</span>
      </div>
    );
  }
}

export default Rating;

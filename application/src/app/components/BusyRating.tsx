import PersonEmpty from "./icons/PersonEmpty";
import PersonFull from "./icons/PersonFull";
import PersonHalf from "./icons/PersonHalf";


type props = {
  busynessStatus: number;
  size: number;
  className?: string;
  style: "full" | "compact";
};

function BusyRating({ busynessStatus, size, style, className }: props) {

  if (style === "full") {
    const fullPerson = Math.floor(busynessStatus);
    const halfPerson = busynessStatus - fullPerson >= 0.5 ? 1 : 0;
    const emptyPerson = 5 - halfPerson - fullPerson;
    return (
      <div className={`flex flex-row no-wrap ${className}`}>
        <div className="flex flex-row no-wrap">
          {[...Array(fullPerson)].map((element, index) => (
            <PersonFull key={index} size={size} />
          ))}
          {[...Array(halfPerson)].map((element, index) => (
            <PersonHalf key={index} size={size} />
          ))}
          {[...Array(emptyPerson)].map((element, index) => (
            <PersonEmpty key={index} size={size} />
          ))}
        </div>
        <span className="align-bottom text-base ml-2">{busynessStatus.toFixed(1)}</span>
        {/* <span className="align-bottom text-base ml-2">{rating} (45 reviews)</span> */}
      </div>
    );
  } else if (style === "compact") {
    return (
      <div className={`flex flex-row no-wrap ${className}`}>
        {/* <StarFull size={size} />           */}
        <PersonFull size={size} />
        <span className="align-bottom text-base ml-1">({busynessStatus.toFixed(1)})</span>
        {/* <span className="align-bottom text-base ml-2">{rating} (45 reviews)</span> */}
      </div>
    );
  }
}

export default BusyRating;

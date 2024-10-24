import Filter from "../components/icons/Filter"
import Listing from "./Listing"

const testData = [
  {
    id: 1,
    img: "",
    title: "J. Paul Leonard Library",
    category: "University Library",
    rating: 4.4,
    wifiEnabled: true,
    busyness: 3
  },
  {
    id: 2,
    img: "",
    title: "Ocean View Branch Library",
    category: "University Library",
    rating: 4.0,
    wifiEnabled: true,
    busyness: 2
  },
  {
    id: 3,
    img: "",
    title: "Marigold Cafe",
    category: "Cafe",
    rating: 4.5,
    wifiEnabled: true,
    busyness: 2
  },
  {
    id: 4,
    img: "",
    title: "Home Coffee Roasters",
    category: "Cafe",
    rating: 4.0,
    wifiEnabled: true,
    busyness: 2
  }
]


function SearchResults() {
  return (
    <div className="shadow-2xl z-10 px-6 py-4">
        <button className="flex no-wrap items-center gap-1.5 rounded-full bg-[#C6E2FF] px-6 py-2 font-josefin">
          <Filter size={20}/>
          {/* For some reason the text is a little higher than the icon */}
          <span className="align-text-bottom">Filters</span>
        </button>
        {/* <h2 className="text-lg">Search Results...</h2> */}
        <div className="flex flex-col gap-6 mt-6">
          {testData.map((data) => 
            <Listing 
              key={data.id}
              img={data.img}
              title={data.title}
              category={data.category}
              rating={data.rating}
              wifiEnabled={data.wifiEnabled}
              busyness={data.busyness}
              />)
          }
        </div>
    </div>
  )
}

export default SearchResults
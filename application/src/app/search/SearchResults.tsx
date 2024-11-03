import { LocationType } from "@prisma/client"
import { LocationData } from "../api/locations/route"
import Filter from "../components/icons/Filter"
import Listing from "../components/Listing"

// On mount, read url query parameters
// Query the database with these search parameters
// Render results out as a list of components

// type SearchResult = {
//   id: number,
//   thumbnail: string,
//   name: string,
//   category: string,
//   rating: number,
//   busynessStatus: number,
//   hasWifi: boolean,
//   animalsAllowed: boolean,
// }

const testData: LocationData[] = [
  {
    id: 1,
    name: "J. Paul Leonard Library",
    address: "",
    phoneNumber: "",
    hasWifi: true,
    seatingCapacity: 1000,
    category: "LIBRARY",
    rating: 4.5,
    busynessStatus: 7,
    imageWebLink: "https://lh3.googleusercontent.com/p/AF1QipMSkLezfmMvzT2qOVixF_mgIM-PeU0hep6LvC9f=s1360-w1360-h1020",
    locationWebsiteLink: "",
    animalFriendliness: false,
    
    // ----------------------------------------
    // needed to add these causes i was getting a build error
    latitude: 0,
    longitude: 0,
    // ----------------------------------------

    operatingHours: [
      {
        day: "MONDAY",
        openTime: "7:00",
        closeTime: "23:00"
      }
    ]
  }
]

// const testData = [
//   {
//     id: 1,
//     img: "https://lh3.googleusercontent.com/p/AF1QipMSkLezfmMvzT2qOVixF_mgIM-PeU0hep6LvC9f=s1360-w1360-h1020",
//     title: "J. Paul Leonard Library",
//     category: "University Library",
//     rating: 4.4,
//     wifiEnabled: true,
//     busyness: 3
//   },
//   {
//     id: 2,
//     img: "",
//     title: "Ocean View Branch Library",
//     category: "University Library",
//     rating: 4.0,
//     wifiEnabled: true,
//     busyness: 2
//   },
//   {
//     id: 3,
//     img: "",
//     title: "Marigold Cafe",
//     category: "Cafe",
//     rating: 4.5,
//     wifiEnabled: true,
//     busyness: 2
//   },
//   {
//     id: 4,
//     img: "",
//     title: "Home Coffee Roasters",
//     category: "Cafe",
//     rating: 4.0,
//     wifiEnabled: true,
//     busyness: 2
//   }
// ]


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
          {/* {testData.map((data) => 
            <Listing 
              // key={data.id}
            // img={data.img}
              // title={data.title}
              // category={data.category}
              // rating={data.rating}
              // wifiEnabled={data.wifiEnabled}
              // busyness={data.busyness}
              />)
          } */}
          {testData.map((data) =>
            <Listing key={data.name} data={data} />)
          }
          {testData.map((data) =>
            <Listing key={data.name} data={data} />)
          }
          {testData.map((data) =>
            <Listing key={data.name} data={data} />)
          }
        </div>
    </div>
  )
}

export default SearchResults
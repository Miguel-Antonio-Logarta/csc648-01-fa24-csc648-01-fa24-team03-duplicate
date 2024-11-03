import React from 'react';
import styles from './BookmarksBox.module.css';
import Listing from "../search/Listing"



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

//application\src\app\profile\bookmarks.modules.css

const BookmarksBox: React.FC = () => {
  return (
    <div className={styles.bookmarksBox}>
      <h2 className={styles.title}>Bookmarks</h2>
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
    {/* /* <div className={styles.bookmarkPlaceholder}>No bookmarks yet</div>*/ }
    </div>
  );
};

export default BookmarksBox;

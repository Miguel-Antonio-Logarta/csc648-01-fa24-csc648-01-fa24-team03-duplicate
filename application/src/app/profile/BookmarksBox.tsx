'use client';
import React, { useEffect } from 'react';
import styles from './BookmarksBox.module.css';
import Listing from '../components/Listing';
import { Session } from 'next-auth';
import useGetUsersBookmarks from '../hooks/useGetUsersBookmarks';

// const testData = [
//   {
//     id: 1,
//     img: "",
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


interface BookmarksBoxProps {
  session: Session | null;
}

interface Bookmark {
  id: string;
  location: {
    id: string;
    name: string;
  };
  creationDate: string;
}

//application\src\app\profile\bookmarks.modules.css

const BookmarksBox: React.FC<BookmarksBoxProps> = ({ session }) => {
  const { usersBookmarks, fetchUsersBookmarks, loading } = useGetUsersBookmarks();
  
  useEffect(() => {
    if(session) {
      fetchUsersBookmarks(session.user.id);
    }
    
    // DO NOT INCLUDE fetchUsersBookmarks IN DEPENDENCIES | It will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className={styles.bookmarksBox}>
      <h2 className={styles.title}>Bookmarks</h2>
      <div className="flex flex-col gap-6 mt-6">

        {usersBookmarks.map((bookmark: Bookmark) => (
          <div key={bookmark.id}>
            <p>{bookmark.location.id}</p>
            <p>{bookmark.location.name}</p>
            <p>{bookmark.creationDate}</p>
          </div>
        ))}
          {/* {testData.map((data) => 
            <Listing 
              key={data.id}
              data={data}
              />)
          } */}
        </div>
    {/* /* <div className={styles.bookmarkPlaceholder}>No bookmarks yet</div>*/ }
    </div>
  );
};

export default BookmarksBox;

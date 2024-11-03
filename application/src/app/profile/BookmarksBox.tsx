// components/BookmarksBox.tsx
import React from 'react';
import styles from './BookmarksBox.module.css';

//application\src\app\profile\bookmarks.modules.css

const BookmarksBox: React.FC = () => {
  return (
    <div className={styles.bookmarksBox}>
      <h2 className={styles.title}>Bookmarks</h2>
      {/* Placeholder for bookmarks */}
      <div className={styles.bookmarkPlaceholder}>No bookmarks yet</div>
    </div>
  );
};

export default BookmarksBox;

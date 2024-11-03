// components/ProfileCard.tsx
import React from 'react';
import styles from './bio.module.css';

const bio: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.avatarPlaceholder}></div>
      <h2 className={styles.username}>Catffeine648</h2>
      <button className={styles.editButton}>Edit Profile</button>
    </div>
  );
};

export default bio;

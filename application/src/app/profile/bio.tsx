'use client';
import React from 'react';
import styles from './bio.module.css';
import { Session } from 'next-auth';

interface BioProps {
  session: Session | null;
}

const bio: React.FC<BioProps> = ({ session }) => {

  return (
    <div className={styles.card}>
      <div className={styles.avatarPlaceholder}></div>
      <h2 className={styles.username}>{session?.user.username}</h2>
      <button className={styles.editButton}>Edit Profile</button>
      <p className={styles.socialNumbers}>Email: {session?.user.email || "No Email provided."}</p>
    </div>
  );
};

export default bio;

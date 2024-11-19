import React from 'react';
import styles from './bio.module.css';

const bio: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.avatarPlaceholder}></div> 
      <h2 className={styles.username}>Catffeine648</h2> 
      <button className={styles.editButton}>Edit Profile</button> 
      <p className={styles.socialNumbers}>X followers | X Following</p>
      <p>user bio here aougaeiphpaei paiegh paiehgpiaeh gpiae hgpiaeh gpia hgp isghaeip haeih pisgh pis aehihipfah ipfh aeid hpiah fpaegh pihg pifgh psfgh p i</p>

    </div>
  );
};

export default bio;

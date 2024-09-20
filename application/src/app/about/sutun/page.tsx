"use client";

import styles from "./page.module.css";
import { useState } from "react";
import Image from 'next/image';
import profile from './cartoonprofile.png'; 

const Page = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div className={styles.outer}>
             <div className={styles.header}>
                Hello! Welcome to my about page.
            </div>
            <Image 
                className={styles.image}
                src={profile} 
                width={250}
                height={250}
                alt="Profile picture"
            />
            <div>
                <h3 className={styles.heading3}><strong>Su Yee Tun</strong></h3>
                <h4 className={styles.heading4}><strong>Team Role: Git Master</strong></h4>
            </div>
            <div className={styles.paragraph}>
                <p>Hello, I'm Su Yee Tun. I am an aspiring Data Analyst with a keen interest in exploring emerging technologies.</p>
                <p>I'm currently pursuing my Bachelor's degree in Computer Science at the San Francisco State University.</p>
                <p>In my free time, I enjoy listening to music and love to learn some new things. 
                    Traveling is also a significant part of my life, as it allows me to experience different cultures and gain new perspectives.
                    My career goal is to work remotely, allowing me to combine my professional aspirations with my love for travel.</p>
            </div>
        </div>
    );
}

export default Page;
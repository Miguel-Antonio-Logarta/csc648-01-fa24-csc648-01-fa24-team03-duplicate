"use client"

import styles from './page.module.css'
import Image from'next/image'
import image1 from './images/dog.jpg'
import image2 from './images/profile2.jpg'
import image3 from './images/bio3.png'

const Page = () => {
    return (
        <body className={styles.pageContainer}> 
            <header>
                <h1 className={styles.profileHeader}> 
                    <div className={styles.profileImage}>
                        <Image src={image1} alt='dog' width={300} height={300}/>
                    </div>
                    <div className={styles.profileName}>Diane Bilse</div>
                </h1>
            </header>
            <div className={styles.bioWrap}>
                <p className={styles.bioText}>
                    Hello eveyone! I&apos;m Diane Bilse and this is my 5th year at SFSU as a Computer Science major. 
                    I&apos;m from Napa Valley and I&apos;ve lived in the North Bay all my life, so the city is part of my home. 
                </p>
                <div className={styles.bioImage}>
                    <Image src={image2} alt='me' width={500} height={500}/>
                </div>
                <p className={styles.bioText}>
                    Outside of my studies, I love trying new restaurants, experimenting with different foods, and spending time cooking. 
                    I&apos;ve been fortunate to travel with my family, and my experiences have broadened my perspectives and grown my love for culture. 
                    I also love playing and listening to music. 
                    I play the piano and I like singing even if I don&apos;t sound the best.
                </p>
                <div className={styles.bioImage}>
                    <Image src={image3} alt='me' width={500} height={500}/>
                </div>
                <p className={styles.bioText}>
                    I decided to major in computer science because I have always been fascinated by technology and I want to find new ways to innovate everyday tools to make technology easier to use and more accessible for all. 
                    I&apos;ve always enjoyed my math and science classes throughout school, and when I decided to take a robotics class is high school, 
                </p>
                <p className={styles.bbioText}>
                    I discovered I could use my skills in a new environment outside of just math problems. 
                    I hope that more students learn about computer science, no matter their career path, as it builds foundational skills for problem solving and critical thinking.
                </p>
                
            </div>
        </body>
    );
}

export default Page;
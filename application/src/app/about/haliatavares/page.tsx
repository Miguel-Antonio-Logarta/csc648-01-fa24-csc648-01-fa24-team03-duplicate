import styles from "./page.module.css";
import Image from 'next/image';
import cat from './cat.png';

const Page = () => {

    return (
        <div className={styles.outer}>
            <Image 
                className={styles.image}
                src={cat}
                width={200}
                height={200} // Provide height as well
                alt="picture"
            />
            <div>
                <h3 className={styles.text}>Halia Tavares</h3>
                <h4 className={styles.text}>Front-End Developer</h4>
            </div>
        </div>
    );
}

export default Page;

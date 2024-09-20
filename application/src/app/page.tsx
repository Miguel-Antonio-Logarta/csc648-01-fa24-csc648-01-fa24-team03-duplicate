import Link from "next/link";
import styles from './page.module.css'
import componentStyles from './components.module.css'

export default function Home() {
  return (
    <div className={styles.outer}>
      <main className={styles.main}>
        <p>This is the home page of</p>
        <b><h1>CSC648-01-FA24-team03</h1></b>
        <Link href="about" className={componentStyles.button}>See our about page →</Link>
      </main>
    </div>
  );
}

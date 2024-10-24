import Link from "next/link";
import styles from './page.module.css'
import componentStyles from './components.module.css'

export default function Home() {
  return (
    <div className={styles.outer}>
      <main className={styles.main}>
        <p>This is the home page of</p>
        <b><h1>CSC648-01-FA24-team03</h1></b>
        <div className="flex flex-col gap-5">
          <Link href="prototype" className={componentStyles.button}>See our vertical prototype! →</Link>
          <Link href="about" className={`${componentStyles.button}`}>See our about page →</Link>
          <Link href="home" className={componentStyles.button}>Go to test home page →</Link>
          <Link href="home" className={componentStyles.button}>Go to search page →</Link>
        </div>
      </main>
    </div>
  );
}

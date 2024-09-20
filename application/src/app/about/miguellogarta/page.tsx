import Image from "next/image";
import styles from "./page.module.css"

const Page = () => {

    return (
        <div className={`h-screen v-screen flex items-center justify-center ${styles["grid-background"]}`}>
            <main className={`max-w-4xl ${styles["grid-container"]}`}>
                <div className={`rounded-lg bg-white p-8 text-center text-neutral-700 ${styles["face"]}`}>
                    <Image className="block bg-white rounded-lg size-40 mb-8" width={300} height={300} src="/teammembers/miguellogarta.jpg" alt="Miguel Logarta"/>
                    <div className="font-bold text-lg text-black">Miguel Logarta</div>
                    <div className="text-[#EE6C4D] font-semibold">Team Lead</div>
                </div>
                <div className={`${styles["links"]} rounded-lg bg-white text-center text-neutral-700 flex flex-col align-center p-8 flex content-center`}>
                    <div className="font-bold text-lg text-black">Links</div>
                    <div className="flex flex-row items-center gap-1 justify-center hover:underline"><Image src="/icons/github.svg" width={16} height={16} alt="GitHub"/><a href="https://github.com/Miguel-Antonio-Logarta">GitHub</a></div>
                    <div className="flex flex-row items-center gap-1 justify-center hover:underline"><Image src="/icons/linkedin.png" width={16} height={16} alt="LinkedIn"/><a href="https://www.linkedin.com/in/miguel-antonio-logarta-08b219235/">LinkedIn</a></div>
                    <div className="flex flex-row items-center gap-1 justify-center"><Image src="/icons/email.svg" width={16} height={16} alt="email"/>Email</div>
                </div>
                <div className={`${styles["about-me"]} rounded-lg bg-white p-8 flex flex-col leading-relaxed align-center text-neutral-700`}>
                    <h2 className="font-bold text-black">About Me</h2>
                    <p>
                        Hello! My name is Miguel Logarta. I am a Computer Science major and I plan on
                        finishing my bachelor&apos;s degree by the end of Fall 2024. I live in Fairfield, but I
                        spent most of my childhood growing up in Thailand. I&apos;m passionate about
                        web dev and usually find myself making websites and learning new web frameworks
                        in my spare time.
                    </p>
                    <p>
                        Aside from coding, I love playing challenging games. Right now,
                        my current favorite game is Dance Dance Revolution. I always make sure to bring
                        my gym equipment with me whenever I play because oh man, it&apos;s a workout.
                        I also like playing RimWorld and Touhou.
                    </p>

                    <Image className="self-end mr-8" src="/icons/sleepy.svg" width={48} height={48} alt="sleepy"/>
                </div>
            </main>
        </div>
    );
}

export default Page;
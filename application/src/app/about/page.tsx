import styles from "./page.module.css"
import TeamCard from "./TeamCard";
// import { promises as fs } from 'fs';
// import MemberSkills from "./MemberSkills";
// import DatabaseCheck from "./DatabaseCheck";

// type MemberSkillsType = {
//     name: string
//     role: string
//     imgUrl: string
//     skills: {[id: string]: number}
//     notes: string
// }

const Page = async () => {
    // const file = await fs.readFile(process.cwd() + '/src/app/about/memberSkills.json', 'utf8');
    // const data: MemberSkillsType[] = JSON.parse(file);

    

    return (
        <div className={styles.outer}>
            <main className="flex flex-col justify-center py-16 px-8">

                <section className="mb-20">
                    <h1 className="font-bold text-center py-16">Meet the team!</h1>
                    <div className="flex flex-wrap gap-8 justify-center items-stretch max-w-6xl">
                        <TeamCard name="Miguel Logarta" role="Team Lead" 
                            link="about/miguellogarta" imgSrc="/teammembers/miguellogarta.jpg" alt="Miguel Logarta" />
                        <TeamCard name="Alan Yu" role="Scrum Master"
                            link="about/alanyu" imgSrc="/teammembers/alanyu.png" alt="Alan Yu" />
                        <TeamCard name="Diane Bilse" role="Front-end"
                            link="about/dianeblise" imgSrc="/teammembers/dianeblise.jpg" alt="Diane Bilse" />
                        <TeamCard name="Halia Tavares" role="Front-end"
                            link="about/haliatavares" imgSrc="/teammembers/haliatavares.png" alt="Halia Tavares" />
                        <TeamCard name="John Bagwell" role="Back-end"
                            link="about/johnbagwell" imgSrc="/teammembers/johnbagwell.jpg" alt="John Bagwell" />
                        <TeamCard name="Timmy Tram" role="Back-end"
                            link="about/timmytram" imgSrc="/teammembers/timmytram.png" alt="Timmy Tram" />
                        <TeamCard name="Su Tun" role="Git Master"
                            link="about/sutun" imgSrc="/teammembers/sutun.png" alt="Su Tun" />
                    </div>
                </section>

                <section className="px-10 dark:border-2 dark:border-slate-800 rounded-xl mb-12 pb-10  max-w-6xl">
                    <section>
                        <h2 className="font-bold my-8 border-b-2 dark:border-slate-900 ">About</h2>
                        <p>We meet twice a week on Mondays (in class) and Wednesdays (Discord @ 7:30 PM)</p>
                        <p className="mb-0">Here is out tech stack:<br />
                            Below is a list of the main technologies used in Team&apos;s software:
                        </p>
                        <ul className="list-disc list-inside leading-relaxed">
                            <li><b>Cloud server:</b> Amazon AWS and MongoDB Atlas</li>
                            <li><b>Operating System:</b> Linux Ubuntu 24.04.1 LTS</li>
                            <li><b>Database:</b> MongoDB 7.0.14</li>
                            <li><b>Web Application Framework:</b> Next.js 14^ (primary), Node.js, Express</li>
                            <li><b>Front-end technology:</b> React.js -{'>'} Next.js 14^</li>
                            <li><b>Web server:</b> Vercel</li>
                            <li><b>IDE:</b> Visual Studio Code</li>
                        </ul>

                        <br />
                        <p className="mb-0">Here are some additional tools we will be using for this project:</p>
                        <ul className="list-disc list-inside">
                            <li>Typescript (Static type checking for JavaScript)</li>
                            <li>Jest (Testing Library)</li>
                            <li>Tailwind CSS (UI Library)</li>
                            <li>NextAuth.js (Authentication)</li>
                            <li>Figma (Front-end design tool)</li>
                            <li>Trello (Project management tool)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-bold my-8 border-b-2 dark:border-slate-900 ">Study Plans</h2>
                        <div className="leading-relaxed">
                            <p className="m-0">Below are the familiarities of each technology for each member of the team as well as their study plans.</p>
                            <p className="m-0">For each technology, their familiarity has a rating from 1 to 5.</p>
                            <p className="m-0"><b>1</b> = Never heard of it / used it</p>
                            <p className="m-0"><b>2</b> = I have heard of it</p>
                            <p className="m-0"><b>3</b> = I&apos;m in the process of learning it</p>
                            <p className="m-0"><b>4</b> = I&apos;ve used it (maybe once or twice)</p>
                            <p><b>5</b> = Significantly familiar (I&apos;ve used it in past projects)</p>
                        </div>
                        {/* <div className="flex flex-col flex-wrap gap-8">
                            {data.map((member: MemberSkillsType) =>
                                <MemberSkills
                                    key={member.name}
                                    name={member.name}
                                    role={member.role}
                                    imgUrl={member.imgUrl}
                                    skills={member.skills} 
                                    notes={member.notes}
                                    />
                            )}
                        </div> */}
                    </section>
                    {/* <DatabaseCheck /> */}
                </section>
            </main>
        </div>
    );
}

export default Page;
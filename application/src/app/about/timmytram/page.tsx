import Image from'next/image'
import pfp from './images/pfp.png';
import stars from './images/stars.png';

const Page = () => {
    return (
        <div className="bg-cover bg-center" style={{ backgroundImage: `url(${stars.src})` }}>
            <div className="flex justify-center items-center h-screen py-10">
                <div className="flex flex-col items-center border-2 border-white p-4 min-w-96 min-h-full gap-2 bg-black bg-opacity-65">
                    
                    <div className="flex flex-col justify-center">
                        <Image src={pfp} alt="Bugcat Capoo PFP" width={125} height={125} className="rounded-full border-4 border-white"/>
                    </div>

                    <hr className="w-full border-1 border-white"/>
                    <div className="flex flex-col justify-center">
                        <p className="font-bold">Name: Timmy Tram</p>
                        <p className="font-bold">ROLE: Backend Lead</p>
                    </div>

                    <hr className="w-full border-1 border-white" />
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-bold underline underline-offset-2">About Me:</p>
                        <p className="max-w-96 text-wrap">
                            Hi, my name's Timmy Tram and I plan on graduating 
                            from SFSU with a Computer Science Major  and Video Game Studies Minor by the 
                            end of the Fall 2024 semester.
                        </p>
                        <p className="max-w-96 text-wrap">
                            I was born, raised and lived in San Francisco my entire life.
                        </p>
                        <p className="max-w-96 text-wrap">
                            My hobbies include playing video games, coding on the side, and working out.
                            I'm currently playing Deadlock, but I enjoy a variety of games including FPS, RPGs, MOBAs, etc.
                            I also really like Bugcat Capoo.
                        </p>
                    </div>
                    
                    <hr className="w-full border-1 border-white" />
                    <p className="font-bold underline underline-offset-2">Links:</p>
                    <div className="flex flex-row justify-center gap-8">
                        <a href="https://github.com/TimmyTram" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View GitHub</a>
                        <a href="https://www.linkedin.com/in/timmytram/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View LinkedIn</a>
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default Page;
import Image from "next/image"
import Link from "next/link"

type Props = {
    name: string
    role: "Team Lead" | "Scrum Master" | "Git Master" | "Front-end Lead" | "Front-end" | "Back-end Lead" | "Back-end"
    link: string
    imgSrc: string
    alt: string
}

const TeamCard = (props: Props) => {
  return (
    <Link href={props.link}>
        <div className="flex flex-col align-center w-64 py-6 px-10 dark:border-2 dark:border-slate-800 min-h-[360px] rounded-xl  hover:underline">
            <Image className="text-center mx-auto block bg-white rounded-full size-32 mb-8" width={128} height={128} src={props.imgSrc} alt={props.name}/>
            <div className="text-center font-bold text-xl">
                {props.name}
            </div>
            <div className="text-neutral-400 text-center text-lg py-2">
                {props.role}
            </div>
            <div className="text-center mt-auto">
                View more →
                {/* → */}
            </div>
            {/* <div>
                <Link href={props.link}>→</Link>
            </div> */}
        </div>
    </Link>
  )
}

export default TeamCard
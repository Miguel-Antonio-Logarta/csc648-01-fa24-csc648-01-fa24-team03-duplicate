import Image from "next/image"

type Props = {
    name: string
    role: string
    imgUrl: string
    skills: {[id: string]: number}
    notes: string
}

const MemberSkills = ({name, role, imgUrl, skills, notes}: Props) => {
  return (
    <div className="border-2 p-8 rounded-md dark:border-2 dark:border-slate-800 min-h-[360px]">
        <div className="flex">
            <Image src={imgUrl} alt={`${name}, ${role}`} width={128} height={128} className="block bg-slate-300 rounded-full size-20 mr-8"/>
            <div className="grid content-center">
                <div className="text-lg font-bold">{name}</div>
                <div className="text-neutral-400">{role}</div>
            </div>
        </div>
        <div className="">
            <h3 className="mb-4 mt-8 font-bold">Skills</h3>
            <ul className="flex flex-wrap gap-2 px-8">
                {Object.entries(skills).map(([skill, rating], i) => (
                    <li key={i} className="block flex rounded border-2 dark:border-slate-800">
                        <div className="border-r-2 dark:border-slate-800 py-2 px-4">{skill}</div>
                        {/* <div className="py-2 px-4 text-slate-600">★ ★ ★</div> */}
                        {/* <div className="py-2 px-4 text-neutral-900">★ ★</div> */}
                        <div className="py-2 px-4">
                            <span className="text-slate-200">{`★`.repeat(rating)}</span>
                            <span className="text-neutral-900">{`★`.repeat(5 - rating)}</span>
                        </div>
                    </li>
                ))}
            </ul>

            <h3 className="mb-4 mt-8 font-bold">Notes</h3>
            <p className="leading-relaxed whitespace-pre-wrap">{notes}</p>
        </div>
    </div>
  )
}

export default MemberSkills
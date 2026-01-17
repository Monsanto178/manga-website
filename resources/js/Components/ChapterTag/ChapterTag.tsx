import { ChapterType } from "@/Types";

interface Props {
    chapter: ChapterType;
}

export const ChapterTag = ({chapter} : Props) => {
    return (
        <>
        <a href='' className='flex justify-between bg-[#333333] py-4 px-8 mb-2 transition-transform duration-300 hover:scale-105'>
            <span>Capítulo {chapter.num}</span>
            {/* <span className='hidden md:block'>{title}</span> */}
            <span>{chapter.time}</span>
        </a>
        </>
    )
}
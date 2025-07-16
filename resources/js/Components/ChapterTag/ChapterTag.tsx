interface Chapter {
    num:number;
    title?:string;
    time:string;
}

export const ChapterTag = ({num, title, time} : Chapter) => {
    return (
        <>
        <a href='' className='flex justify-between bg-[#333333] py-4 px-8 mb-2 transition-transform duration-300 hover:scale-105'>
            <span>Capítulo {num}</span>
            {/* <span className='hidden md:block'>{title}</span> */}
            <span>{time}</span>
        </a>
        </>
    )
}
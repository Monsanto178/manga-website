import { ChapterTag } from "./ChapterTag";

interface Chapter {
    id:number;
    num:number;
    title?:string;
    time:string;
}

interface ChapterList {
    chapters: Chapter[];
}

export const ChapterTagList = ({chapters} : ChapterList) => {
    return (
        <>
        <div>
            {chapters.map((chapter) => {
                return(
                <ChapterTag key={chapter.id} num={chapter.num} time={chapter.time} title={chapter.title}></ChapterTag>
                )
            })}
        </div>
        </>
    )
}
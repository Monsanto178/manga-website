import { ChapterType } from "@/Types";
import { ChapterTag } from "./ChapterTag";

interface ChapterList {
    chapters: ChapterType[];
}

export const ChapterTagList = ({chapters} : ChapterList) => {
    return (
        <>
        <div>
            {chapters.map((chapter, idx) => {
                return(
                <ChapterTag key={idx} chapter={chapter}></ChapterTag>
                )
            })}
        </div>
        </>
    )
}
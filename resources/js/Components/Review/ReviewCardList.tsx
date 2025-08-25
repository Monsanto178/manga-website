import { Pagination } from "./Pagination";
import { ReviewCard } from "./ReviewCard";

type Manga = {
    mal_id:number;
    images:{jpg:{image_url:string}, webp:{image_url:string}};
    title:string;
}

type User = {
    username:string;
    images:{jpg:{image_url:string}, webp:{image_url:string}}
    url?: string;
}

type Review = {
    mal_id:number;
    type?:string;
    date:string;
    review:string;
    reactions?:{
        overall: 0,
        nice: 0,
        love_it: 0,
        funny: 0,
        confusing: 0,
        informative: 0,
        well_written: 0,
        creative: 0
    };
    tags:Array<string>
    entry:Manga;
    user:User;
}

interface Props {
    reviews: Review[];
    pagination?:{has_next_page:boolean};
    actual_page?:number;
    showManga?:boolean;
    changePage?:(page:number) => void
}

export const ReviewCardList = ({reviews, showManga=true, pagination, actual_page=1, changePage= () => {}}:Props) => {
    
    return (
        <>
        <article className="flex gap-y-[2rem] justify-between flex-wrap">
            {reviews.map((review, idx) => {
                return(
                    <ReviewCard key={idx} review={review} showManga={showManga}/>
                )
            })}
        </article>
        <article>
            {<Pagination has_next_page={pagination?.has_next_page} actual_page={actual_page} changePage={changePage}/>}
        </article>
        </>
    )
}
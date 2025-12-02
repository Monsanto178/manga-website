import { ReviewType } from "../../Types";
import { Pagination } from "./Pagination";
import { ReviewCard } from "./ReviewCard";

interface Props {
    reviews: ReviewType[];
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
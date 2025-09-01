import { useEffect, useState } from "react";
import { LoadingReviews, ReviewCardList } from "../Components";

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

const RecentsReviews = () => {
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [reviewError, setReviewError] = useState(false);

    const getCsrfToken = async () => {
        const response = await fetch('/csrf-token');
        const data = await response.json();
        return data.csrf_token;
    };

    const fetchData = async(endpoint:string) => {
        const csrf_token = await getCsrfToken();
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                },
                body: null
            });
            if(!response.ok) throw new Error("An error has occurred.");
            
            const data = await response.json();
            return data;
        } catch (error) {
            setReviewError(true);
            return {error:true};
        } finally {
            setLoadingReviews(false);
        }
    }

    async function runFetchReviews() {
        const endpoint = '/reviews';
        const data = await fetchData(endpoint);

        setReviews(data);
    }
    if(reviewError) {
        throw new Error("Something went wrong.");
    }

    useEffect(() => {
        runFetchReviews();
    }, [])
    return (
        <>
        <section className={`pt-20 pb-4 px-4 sm:px-[4.2rem] flex flex-col gap-y-8 ${reviewError ? 'h-[100dvh]' : ''}`}>
            <article className="text-[26px] md:text-[32px]">
                <div>
                    <strong>Recents Reviews</strong>
                </div>
            </article>

            <section className="flex flex-wrap justify-between gap-x-4 gap-y-12">
                {reviews  !== null && !loadingReviews && !reviewError &&
                    <ReviewCardList reviews={reviews}/>
                }
                {loadingReviews &&
                    <LoadingReviews />
                }
            </section>
        </section>


        </>
    )
}

export default RecentsReviews;
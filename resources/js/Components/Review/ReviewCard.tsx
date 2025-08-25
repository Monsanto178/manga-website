import { useEffect, useRef, useState } from "react";

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
    review: Review;
    showManga?:boolean;
}

export const ReviewCard = ({review, showManga=true}:Props) => {
    const [currentExp, setCurrentExp] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const reviewWidth = !showManga ? 'w-full' : currentExp ? 'w-[90%]' : 'w-[70%]';

    const comment = review.review.split('\n\n');

    const scrollTo = (expand=false) => {
        const timeout = expand ? 100 : 400
            setTimeout(() => {
                if (cardRef.current) {
                    const y = cardRef.current.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: y - 59,
                            behavior: 'smooth',
                    });
                }
            }, timeout);
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const showMore = () => {
        if(currentExp) {
            scrollTo(false);
            setCurrentExp(false)
        } else {
            scrollTo(true);
            setCurrentExp(true)
        }
    }

    const date = formatDate(review.date);
    let tagColor = '';

    switch (review.tags[0]) {
        case 'Not Recommended':
            tagColor = 'bg-red-500';
            break;
        case 'Recommended':
            tagColor = 'bg-green-500';
            break;
        case 'Mixed Feelings':
            tagColor = 'bg-orange-500';
            break;
        default:
            break;
    }

    return (
        <>
        <div ref={cardRef} className={`bg-[#363636] relative transition-all duration-400 ease-in-out flex p-4 w-full overflow-hidden ${currentExp ? 'flex-col sm:flex-row gap-4 max-h-none' : 'gap-x-4 md:w-[48%] max-h-[20rem]'}`}>
            {showManga &&
            <div className={`flex flex-col gap-y-4 ${currentExp ? 'w-[100%] sm:w-[12rem]' : 'w-[30%]'} justify-between`}>
                <a href={`/mangas/manga/${review.entry.mal_id}`} className="relative w-full flex flex-col gap-y-2">
                    <picture className="group flex relative aspect-[6/8]">    
                        <img src={review.entry.images.webp.image_url} alt="" className="w-full h-full"/>
                        <div className="absolute p-2 text-[14px] bottom-0 w-full bg-[#1e1e1efc]">
                            <strong className="overflow-hidden text-elipsis"                                 
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                    }}>
                                        {review.entry.title}
                            </strong>
                        </div>
                    </picture>
                </a>
            </div>
            }
            {!showManga &&
                <div className={`flex flex-col items-center gap-x-2 text-[12px] sm:text-[14px]`}>
                    <div className="flex pb-2">
                        <span className="text-[12px] sm:text-[14px]">Posted By:</span>
                    </div>
                    <picture className="overflow-hidden rounded-[50%] w-15 h-15 sm:w-25 sm:h-25">
                        <img src={review.user.images.webp.image_url} alt="" className="w-full aspect-[4/4]"/>
                    </picture>
                    <div>
                        <strong className="text-[14px] sm:text-[16px]">{review.user.username}</strong>
                    </div>
                </div>
            }

            <div className={`flex flex-col gap-y-4 ${reviewWidth} justify-between overflow-hidden h-full`}>
                <div className="relative flex flex-col gap-y-4 w-full h-full items-end" style={currentExp ? {} : {maskImage:'linear-gradient(black 75%, transparent 90%)'}}>
                    <div className="flex flex-wrap gap-y-2 justify-between w-full items-center">
                        <div className={`${tagColor} p-2 rounded-[10px]`}>
                            <span>{review.tags[0]}</span>
                        </div>

                        <div className="text-[12px] sm:text-[14px]">
                            <span>{date}</span>
                        </div>
                    </div>
                    <div className="w-full text-[12px] sm:text-[14px] flex flex-col gap-4">
                        {comment.map((paragraph, idx) => {
                            return (
                            <p key={idx} className="overflow-hidden text-elipsis">{paragraph}</p>
                            )
                        })}
                    </div>
                </div>
                
                <button onClick={() => showMore()} className={`absolute bottom-3 right-3 text-[12px] sm:text-[14px] p-2 bg-[#181818] transition-all duration-300 hover:bg-[#3C91E6] cursor-pointer rounded-[10px] ${currentExp ? 'hidden' : 'block'}`}>Expand</button>
                
                {showManga && 
                <div className={`w-full justify-end gap-x-2 text-[12px] sm:text-[14px] ${currentExp ? 'flex' : 'hidden'}`}>
                    <picture className="overflow-hidden rounded-[50%] w-10 h-10 sm:w-15 sm:h-15">
                        <img src={review.user.images.webp.image_url} alt="" className="w-full aspect-[4/4]"/>
                    </picture>
                    <div className="flex flex-col gap-y-2">
                        <span>Posted By:</span>
                        <strong>{review.user.username}</strong>
                    </div>
                </div>
                }
                <div className={`flex justify-end ${currentExp ? 'block' : 'hidden'}`}>
                    <button onClick={() => showMore()} className={`p-2 bg-[#181818] transition-all duration-300 hover:bg-[#3C91E6] cursor-pointer rounded-[10px] text-[12px] sm:text-[14px]`}>Reduce</button>
                </div>
            </div>
        </div>
        </>
    )
}
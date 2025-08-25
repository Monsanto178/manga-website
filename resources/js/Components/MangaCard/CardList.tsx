import { MangaCard } from "./MangaCard"
import '../../../css/mangaCard.css'
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";

interface Manga {
    mal_id:number;
    images:{
        jpg:{image_url:string, small_image_url:string},
        webp:{image_url:string, small_image_url:string}
    };
    status?:string;
    publishing?:boolean;
    title:string;
}
interface MangaList {
    manga: Array<Manga> | null
}
export const CardList = ({manga} : MangaList) => {
    const halfManga = manga ? manga.slice(0, Math.floor(manga.length / 2) + 1) : [];
    const clonedManga = manga ? [...manga, ...halfManga] : [];
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const defaultMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const moveBtns = [];
    for (let i = 0; i <= Math.ceil(clonedManga.length / 2)+1; i++) {
        moveBtns.push(i);
    }

    const handleTransitionEnd = () => {
        if (selectedIdx > Math.ceil(clonedManga.length / 2)+1) {
            setIsTransitioning(false);
            setSelectedIdx(0);

            requestAnimationFrame(() => {
                setSelectedIdx(0);

                requestAnimationFrame(() => {
                    setIsTransitioning(true);
                });
            });
        }
    };

    const moveSlider = () => {
        setSelectedIdx((prevIndex) => prevIndex + 1);
    }

    const goToIdx = (idx:number) => {
        setSelectedIdx(idx);
    }

    let defaultCardStyle = "flex shrink-0 p-4 w-64 h-[317px] inline-block text-white";
    
    const [isPaused, setIsPaused] = useState(false);

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    useEffect(() => {
        if (!manga || isPaused) return
        
        const interval = setInterval(moveSlider, 3000)
        return () => clearInterval(interval);
    }, [manga, isPaused])

    // useEffect(() => {
    //     if (!isTransitioning) {
    //         requestAnimationFrame(() => setIsTransitioning(true));
    //     }
    // }, [isTransitioning]);
    
    return(
    <>
    <div className='flex gap-x-6 overflow-x-hidden whitespace-nowrap overflow-y-hidden py-5'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        { manga &&
        clonedManga.map((card, idx) => {
            return (<MangaCard key={idx} manga={card} handleTransitionEnd={handleTransitionEnd} isTransitioning={isTransitioning} selectedIdx={selectedIdx}></MangaCard>)
        })
        }
        {!manga &&
        defaultMap.map((el, idx) => {
            return (
                <div key={idx} className={defaultCardStyle}>
                    <Skeleton key={el} width='100%' height='100%'/>
                </div>
            )
        })
        }
    </div>
    <div className="text-white flex justify-center items-center gap-4 mt-4 h-8">
        {manga && manga.length >0 &&
        moveBtns.map((idx) => {
            return (
                <button key={idx} onClick={() => goToIdx(idx)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`cursor-pointer bg-[#FF6740] rounded-[50%] ${selectedIdx === idx ? 'w-[1.5rem] h-[1.5rem]' : 'w-[1rem] h-[1rem] transition-transform duration-500 ease-in-out hover:scale-150'}`}>
                </button>
            )
        })
        }
    </div>
    </>
    )
}
import { useEffect, useState } from "react";
import { MangaType } from "../../Types";

interface Props {
    manga: MangaType;
    handleTransitionEnd: () => void;
    isTransitioning?:boolean;
    selectedIdx?:number;
}

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width; 
};

export const MangaCard = ({manga, handleTransitionEnd, isTransitioning, selectedIdx=0}: Props) => {
    const cover = manga.images.webp.image_url;
    let status_color = "#4CAF50";

    const actualWidth = useWindowWidth();

    const [percentage, setPercentage] = useState(109.3);


    useEffect(() => {
        if(actualWidth <640) {
            setPercentage(118.7)
        } else if (actualWidth <760) {
            setPercentage(113.9)
        } else {
            setPercentage(109.3);
        }
    }, [actualWidth])

    switch (manga.status) {
        case 'Finished':
            status_color = "#2196F3"
            break;
        case 'On Hiatus':
            status_color = "#FFC107"
            break;
        case 'Cancelled':
            status_color = "#F44336"
            break;
        case 'Upcoming':
            status_color = "#9C27B0"
            break;
        default:
            break;
    }
    
    return (
        <>
        <div className={`shrink-0 w-32 md:w-64 sm:w-43 h-fit inline-block text-white transition-transform ${isTransitioning ? 'duration-500 ease-in-out' : 'duration-0'}`}
            style={{
                transform: `translateX(calc(-${selectedIdx * percentage}%))`,
            }}
            onTransitionEnd={handleTransitionEnd}
            >
            <div className="relative flex flex-col object-cover transition-transform duration-300 hover:scale-107 overflow-hidden rounded-md">
                <a href={`/mangas/manga/${manga.mal_id}`} className="block">
                    <picture className="h-[80%]">
                        <img src={cover} alt="manga_img" className="w-full h-full aspect-[24/34] " />
                    </picture>
                    <div className="absolute bottom-0 w-full">
                        <div className="bg-[#2D2D2Deb] p-2">
                            {manga.status &&
                            <div className="text-[14px] flex items-center gap-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 2048 2048"><path fill={status_color} d="M960 256q115 0 221 30t198 84t169 130t130 168t84 199t30 221q0 115-30 221t-84 198t-130 169t-168 130t-199 84t-221 30q-115 0-221-30t-198-84t-169-130t-130-168t-84-199t-30-221q0-115 30-221t84-198t130-169t168-130t199-84t221-30"/></svg>
                                <span>{manga.status}</span>
                            </div>
                            }
                            <div className="text-[16px]">
                                <span style={{fontWeight:'600'}}>{manga.title}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        </>
    )
}

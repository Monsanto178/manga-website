import { TagList } from "../Tag/TagList";

interface Manga {
    mal_id:number;
    images:{
        jpg: {
            image_url:string;
            small_image_url:string;
            large_image_url:string;
        },
        webp: {
            image_url:string;
            small_image_url:string;
            large_image_url:string;
        }
    }
    title:string;
    type:string;
    chapters:number;
    status:string;
    favorites:number;
    synopsis:string;
    score:number;
    genres:[];
    demographics:[]
}

type Props = {
    data: Manga;
}

export const FullMangaCard = ({data} :Props) => {
    let status_color = "#4CAF50";
    switch (data.status) {
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
         <div className="flex flex-row h-[40vh] overflow-y-hidden gap-x-4 bg-[#363636] p-4 rounded-[10px] relative">
            <div className="flex flex-col max-w-[30%]">
                <a href={`/mangas/manga/${data.mal_id}`} className="w-full overflow-hidden">
                        <img className="w-full h-full" src={data.images.webp.image_url} alt="manga_cover" />
                </a>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="#fff" d="M22 9.67a1 1 0 0 0-.86-.67l-5.69-.83L12.9 3a1 1 0 0 0-1.8 0L8.55 8.16L2.86 9a1 1 0 0 0-.81.68a1 1 0 0 0 .25 1l4.13 4l-1 5.68a1 1 0 0 0 1.47 1.08l5.1-2.67l5.1 2.67a.93.93 0 0 0 .46.12a1 1 0 0 0 .59-.19a1 1 0 0 0 .4-1l-1-5.68l4.13-4A1 1 0 0 0 22 9.67m-6.15 4a1 1 0 0 0-.29.88l.72 4.2l-3.76-2a1.06 1.06 0 0 0-.94 0l-3.76 2l.72-4.2a1 1 0 0 0-.29-.88l-3-3l4.21-.61a1 1 0 0 0 .76-.55L12 5.7l1.88 3.82a1 1 0 0 0 .76.55l4.21.61Z"/></svg>
                        <span>{data.score ?? 0}</span>
                    </div>
                    <div className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="#fff" d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837t2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575t2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25t-.525-.125t-.425-.375m.95 4.725"/></svg>
                        <span>{data.favorites ?? 0}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full gap-y-4 overflow-hidden" style={{maskImage:'linear-gradient(to bottom, black 90%, transparent 100%'}}>
                <div className="justify-between flex items-start">
                    <a href={`/mangas/manga/${data.mal_id}`} className="text-[14px] md:text-[18px] sm:text-[16px]">
                        <strong>{data.title}</strong>
                    </a>
                    <div className="items-center flex text-[14px] lg:text-[16px] min-w-[5.7rem]">
                        <svg className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path fill={status_color} d="M960 256q115 0 221 30t198 84t169 130t130 168t84 199t30 221q0 115-30 221t-84 198t-130 169t-168 130t-199 84t-221 30q-115 0-221-30t-198-84t-169-130t-130-168t-84-199t-30-221q0-115 30-221t84-198t130-169t168-130t199-84t221-30"/></svg>
                        <span>{data.status}</span>
                    </div>
                </div>
                
                <TagList listaTags={data.genres}/>

                <div className="text-[12px] md:text-[14px]">
                    <p              
                    style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 9,
                    WebkitBoxOrient: 'vertical',
                    }}>
                        {data.synopsis ? data.synopsis : 'No synopsis has been founded.'}
                    </p>
                </div>
            </div>
         </div>
        </>
    )
}
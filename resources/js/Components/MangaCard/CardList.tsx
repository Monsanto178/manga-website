import { MangaCard } from "./MangaCard"
import '../../../css/mangaCard.css'

interface Manga {
    mal_id:number;
    images:{
        jpg:{image_url:string, small_image_url:string},
        webp:{image_url:string, small_image_url:string}
    };
    status:string;
    publishing?:boolean;
    title:string;
}
interface MangaList {
    manga: Manga[]
    horizontalView?:boolean;
}
export const CardList = ({manga, horizontalView=false} : MangaList) => {
    let styles = horizontalView === true ? "overflow-x-auto whitespace-nowrap overflow-y-hidden pb-5 mangaCard" : "flex flex-wrap align-stretch justify-center md:justify-start p-[2rem] text-white";
    return(
    <>
    <div className={styles}>
        {manga.map((card) => {
            return (<MangaCard key={card.mal_id} manga={card} horizontalView={horizontalView}></MangaCard>)
        })}
    </div>
    </>
    )
}
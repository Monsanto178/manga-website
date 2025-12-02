import { MangaType } from "../../Types";

type Props = {
    manga: MangaType;
}

export const SearchMangaCard = ({manga}:Props) => {
    let status_color = "#4CAF50";

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
        <a href={`/mangas/manga/${manga.mal_id}`} className="px-4 py-2 flex gap-x-2 transition-transform duration-300 hover:scale-105 overflow-hidden cursor-pointer">
            <picture className="aspect-[2/3] w-14 h-20">
                <img className="w-full h-full" src={manga.images.webp.image_url} alt="cover" />
            </picture>
            <div className="w-full overflow-hidden text-[12px] sm:text-[14px]">
                <div className="truncate">
                    <strong>{manga.title}</strong>
                </div>
                <div className="flex gap-x-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 2048 2048"><path fill={status_color} d="M960 256q115 0 221 30t198 84t169 130t130 168t84 199t30 221q0 115-30 221t-84 198t-130 169t-168 130t-199 84t-221 30q-115 0-221-30t-198-84t-169-130t-130-168t-84-199t-30-221q0-115 30-221t84-198t130-169t168-130t199-84t221-30"/></svg>
                    <span>{manga.status}</span>
                </div>
            </div>
        </a>
        </>
    )
}
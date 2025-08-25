import { SearchMangaCard } from "./SearchMangCard";

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

type SearchResult = {
    pagination:{
        last_visible_page:number;
        current_page:number;
        items:{
            total:number;
        }
    }
    data:Array<Manga>;
    query?:string;
}

export const SearchResult = ({data, pagination, query}:SearchResult) => {
    const reducedData = data.length>4 ? data.slice(0, 4) : data;
    return (
        <>
        <div className="flex flex-col w-80 text-white divide-y divide-gray-300 overflow-hidden bg-[#2D2D2D]">
            {reducedData.map((manga, idx) => {
                return (
                    <>
                    <SearchMangaCard key={idx} manga={manga}/>
                    </>
                )
            })}
            <a href={`/tags/all?q=${query}`} className="w-full p-4 transition-all duration-300 hover:bg-[#3C91E6] cursor-pointer">
                <strong>View {pagination.items.total - 4} more results</strong>
            </a>
        </div>
        </>
    )
}
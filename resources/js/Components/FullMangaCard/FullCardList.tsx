import { MangaType, PagedMangaType } from "../../Types";
import { FullMangaCard } from "./FullMangaCard"
import { CategoryPagination } from "./PaginationCard";

export const FullCardList = (props:PagedMangaType) => {
    return (
    <>
        <style>
        {`
          @media (max-width: 900px) {
            .gridCard {
                grid-template-columns: repeat(auto-fill, 48%) !important;
            }
          }
          @media (max-width: 769px) {
            .gridCard {
                grid-template-columns: repeat(auto-fill, 100%) !important;
            }
          }
        `}
        </style>
        {props.data.length === 0 && 
            <div className="w-full flex justify-center text-[14px] md:text-[18px]">
                <div className="p-4 bg-[#363636] w-[60%] flex justify-center rounded-[10px]">
                    <strong>No results found.</strong>
                </div>
            </div>
        }
        {props.data.length > 0 &&
        <article className="gridCard grid justify-center items-center p-2" style={{gridTemplateColumns:'repeat(auto-fill, 45%)', rowGap:'3rem', columnGap:'1.5rem'}}>
            {props.data.map((manga) =>
                <FullMangaCard key={manga.mal_id} data={manga}/>
            )}
        </article>
        }
    </>
    )
}
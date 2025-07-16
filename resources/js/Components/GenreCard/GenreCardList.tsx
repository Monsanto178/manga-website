import { GenreCard } from "./GenreCard"

interface Card {
    key:number;
    title:string;
    cover:string;
    url?:string;
}
interface List {
    cards: Card[];
}
export const GenreCardList = ({cards} : List) => {
    return (
        <>
        <div className="text-white w-full overflow-hidden">
            <div className="text-[26px] lg:text-[30px]">
                <span>Géneros</span>
            </div>
            <div className="overflow-x-auto whitespace-nowrap">
                {cards.map((card) => {
                    return (
                        <GenreCard cover={card.cover} title={card.title} key={card.key}></GenreCard>
                    )
                })}
            </div>
        </div>
        </>
    )
}
import { CardType } from "../../Types";
import { GenreCard } from "./GenreCard"

// interface Card {
//     key:number;
//     title:string;
//     cover:string;
// }
interface List {
    // cards: Card[];
    cards: CardType[];
}
export const GenreCardList = ({cards} : List) => {
    return (
        <>
        <div className="text-white w-full overflow-hidden">
            <div className="text-[26px] lg:text-[30px]">
                <span>Géneros</span>
            </div>
            <div className="overflow-x-auto whitespace-nowrap">
                {cards.map((card, idx) => {
                    return (
                        <GenreCard cover={card.cover} title={card.title} key={idx}></GenreCard>
                    )
                })}
            </div>
        </div>
        </>
    )
}
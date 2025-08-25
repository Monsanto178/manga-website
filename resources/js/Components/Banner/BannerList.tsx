import { useState } from "react";
import { Banner } from "./Banner";

interface Tag {
    mal_id:number;
    name: string;
}

interface Card {
    id:number;
    title:string;
    cover:string;
    tags:Tag[];
    author:string;
    description:string;
}

interface CardList {
    cards: Card[];
}

export const BannerList = ({cards} : CardList) => {
    const [cardIndex, setCardIndex] = useState(0)

    function previousCard() {
        setCardIndex((index) => {
            if (index === 0) return cards.length-1;
            return index-1
        })
    }
    function nextCard() {
        setCardIndex((index) => {
            if (index === cards.length-1) return 0;
            return index+1
        })
    }
    return (
        <>
        {cards.map((card) => {
            return (
            <div className="relative bg-cover bg-center w-full h-full flex-shrink-0 flex-grow-0 text-white" style={{translate: `${-100 * cardIndex}%`, transition:"translate 600ms ease-in-out"}}>
                <Banner key={card.id} author={card.author} cover={card.cover} tags={card.tags} title={card.title} description={card.description} ></Banner>
                <div className="bg-black flex justify-center">
                    <button onClick={previousCard} className="cursor-pointer p-2">Previous</button>
                    {cards.map((_, index) => {
                        return (
                            <button onClick={() => {setCardIndex(index)}} className="cursor-pointer p-2">{index}</button>
                        )
                    })}
                    <button onClick={nextCard} className="cursor-pointer p-2">Next</button>
                </div>
            </div>
            )
        })}
        </>
    )
}
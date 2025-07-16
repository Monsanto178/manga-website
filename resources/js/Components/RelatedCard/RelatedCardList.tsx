import React from "react";
import { RelatedCard } from "./RelatedCard";
import { LoadingCard } from "./LoadingCard";

type Manga = {
    mal_id:number;
    type:string;
    name:string;
}

type Relation = {
    relation:string;
    entry:Array<Manga>;
}

type Relations = {
    relations: Relation[];
}
export const RelatedCardList = ({relations}:Relations) => {
    return (
        <>
        <article className="grid justify-center" style={{gridTemplateColumns:'repeat(auto-fill, 300px)', rowGap:'3rem', columnGap:'1.5rem'}}>
            {relations.map((element, index) => {
            const relacion = element.relation;
                return (
                    <React.Fragment key={index}>
                    {element.entry.map((el) => (
                        <RelatedCard key={el.mal_id} media={el} relation={relacion}/>
                    ))}
                    </React.Fragment>
                )
           })}
        </article>
        </>
    )
}
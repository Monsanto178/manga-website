import React, { useEffect, useRef, useState } from "react";
import { RelatedCard } from "./RelatedCard";
import { LoadingCard } from "./LoadingCard";

type PlainManga = {
    mal_id:number;
    type:string;
    relation:string;
}

interface FullManga {
    mal_id:number;
    name:string;
    title?:string;
    type:string;
    status:string;
    images:{
        jpg:{
            image_url:string;
            small_image_url:string;
            large_image_url:string;
        }
        webp:{
            image_url:string;
            small_image_url:string;
            large_image_url:string;
        }
    }
}

type FullRel = {
    mangas: Array<{entry:FullManga; relation:string;}>
    setLoading: false;
}
type PlainRel = {
    plainMangas: Array<PlainManga>
    setLoading: true;
}

interface Props<T> {
    prop:T;
}


export const RelatedCardList = ({prop}:Props<PlainRel | FullRel>) => {
    const relatedRef = useRef<HTMLElement>(null);

    const scrollTo = () => {
        if (relatedRef.current) {
            const y = relatedRef.current.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: y - 150,
                behavior: 'smooth',
            });
        }
    }

    useEffect(() => {
        setTimeout(() => {
            scrollTo()
        }, 100);
    }, [])
    return (
        <>
        <article ref={relatedRef} className="grid justify-center" style={{gridTemplateColumns:'repeat(auto-fill, 300px)', rowGap:'3rem', columnGap:'1.5rem'}}>
            {prop.setLoading &&
                prop.plainMangas.map(el => {
                    return (
                        <LoadingCard key={el.mal_id}/>
                    )
                })
            }
            
            {!prop.setLoading && 
            prop.mangas.map((el, index) => {
                return (
                    <RelatedCard key={index} entry={el.entry} relation={el.relation}/>  
                )
            })
            }
        </article>
        </>
    )
}
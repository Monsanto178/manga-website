import React, { useEffect, useRef, useState } from "react";
import { RelatedCard } from "./RelatedCard";
import { LoadingCard } from "./LoadingCard";

type Manga = {
    mal_id:number;
    type:string;
    name:string;
}

type Relate = Manga & {
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

type Relation = {
    relation:string;
    entry:Array<Manga>;
}

type Relations = {
    relations: Relation[];
}

type DataList = {
    entry: Relate;
    relation:string;
}

export const RelatedCardList = ({relations}:Relations) => {
    const [isLoading, setLoading] = useState(true);
    const [related, setRelated] = useState<DataList[]>([]);
    const cacheRelated = useRef<DataList[]>([]);
    const dataToSend = transformRelations({relations});
    type ObjSend = {
        mal_id:number;
        type:string;
        relation:string;
    }

    function transformRelations (obj:Relations):ObjSend[] {
        return obj.relations.flatMap(rel => 
            rel.entry.map(e => ({
                mal_id: e.mal_id,
                type:e.type,
                relation: rel.relation,
            }))
        )
    }
    const getCsrfToken = async () => {
        const response = await fetch('/csrf-token');
        const data = await response.json();
        return data.csrf_token;
    };
    
    const fetchData = async () => {
        const csrfToken = await getCsrfToken();
        try {
            const response = await fetch(`/mangas/manga/related`, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({data: dataToSend})
            });

            if (!response.ok) throw new Error("An error has occurred");

            const res = await response.json();
            console.log(res);
            cacheRelated.current = res;
            setRelated(res);
        } catch (error) {
            console.error('The error is: ' + error)
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        console.log('CACHE RELATED');
        
        console.log(cacheRelated.current);
        
        if(cacheRelated.current.length>0) {
            setRelated(cacheRelated.current);
            setLoading(false)
            // console.log('ES MAS LARGO. ES MAS LARGO');
            
        } else {
            fetchData();
        };
    }, []);
    relations.map((el) => {el.relation})
    return (
        <>
        <article className="grid justify-center" style={{gridTemplateColumns:'repeat(auto-fill, 300px)', rowGap:'3rem', columnGap:'1.5rem'}}>
            {isLoading &&
                dataToSend.map(el => {
                    return (
                        <LoadingCard key={el.mal_id}/>
                    )
                })
            }
            
            {!isLoading && 
            related.map((el, index) => {
                return (
                    <RelatedCard key={index} entry={el.entry} relation={el.relation}/>  
                )
            })
            }
        </article>
        </>
    )
}
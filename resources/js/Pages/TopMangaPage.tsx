import { useEffect, useState, useRef } from "react";
import { CategoryPagination, FullCardList , CategoryLoading, OrderCard} from "../Components";

type Type = "manga" | "novel" | "lightnovel" | "oneshot" | "doujin" | "manhwa" | "manhua";
type Status = 'publishing' | 'complete' | 'discontinued' | 'hiatus' | 'upcoming';
type OrderBy = 'score' | 'start_date' | 'popularity' | 'title';

interface Category {
    name: string;
    mal_id: number;
    page:string;
    status: Status | null;
    type: Type | null;
    order_by: OrderBy;
};

interface Manga {
    mal_id:number;
    images:{
        jpg: {
            image_url:string;
            small_image_url:string;
            large_image_url:string;
        },
        webp: {
            image_url:string;
            small_image_url:string;
            large_image_url:string;
        }
    }
    title:string;
    type:string;
    chapters:number;
    status:string;
    favorites:number;
    synopsis:string;
    score:number;
    genres:[];
    demographics:[]
}

type Mangas = {
    pagination: {
        last_visible_page:number;
        has_next_page:boolean;
        current_page:number;
    }
    data: Array<Manga>;
}

type Params = {
    page:string;
    genreId:number;
    order_by:string | null;
    sort:string | null;
    type:string | null;
    status:string | null;
}

const TopMangaPage = (category:Category) => {
    const defaultParams = {
        isTop: true,
        page: category.page, 
        genreId: category.mal_id,
        sort:'desc',
        order_by: category.order_by,
        type: category.type,
        status: category.status,
    }

    const [isLoading, setLoading] = useState(true);
    const [actualPage, setActualPage] = useState(category.page);
    const [mangas, setMangas] = useState<Mangas | null>(null);
    const [mangasError, setMangasError] = useState(false);
    const mangasRef = useRef<HTMLElement>(null);

    const [params, setParams] = useState<Params>(defaultParams);
    const [isFiltered, setFiltered] = useState(false);
 
    const getCsrfToken = async () => {
        const response = await fetch('/csrf-token');
        const data = await response.json();
        return data.csrf_token;
    };

    const fetchData = async (endpoint:string, body:string) =>  {
        const csrf_token = await getCsrfToken();
        try {
            const petition = await fetch(endpoint, 
              {  method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                },
                body: body
            });
            
            if (!petition.ok) throw new Error("An error has occurred.");

            const response = await petition.json();
            setFiltered(false);
            return response;
        } catch (error) {
            setMangasError(true);
        }
    }

    async function runFetch(parameters:Params) {
        const endpoint = `/tags/getMangas`;
        const body = JSON.stringify(parameters);
        const data = await fetchData(endpoint, body);

        setMangas(data);
        setLoading(false);
    }

    const scrollTo = () => {
        if (mangasRef.current) {
            const y = mangasRef.current.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth',
            });
        }
    }


    const updateUrl = (page:string) => {
        let baseUrl = window.location.href.split('?')[0];
        baseUrl += `?page=${page}`;
        console.log('URL ES: ' + baseUrl);
        
        history.pushState(null,'', baseUrl);
    }

    const changePage = (page:string) => {
        let actualUrl = window.location.href
        if (actualUrl.includes('?')) {
            actualUrl = actualUrl.split('?')[0]
            history.pushState(null,'', actualUrl)
        }
        setParams(prev => ({...prev, page:page}))
        setActualPage(page);
        updateUrl(page);
        setLoading(true);
        scrollTo();
    }

    useEffect(() => {
        if (mangas === null) {
            runFetch(params);
        }
    }, [])


    if(mangasError) {
        throw new Error("Something went wrong here.");
    }

    useEffect(() => {
        runFetch(params);
    }, [actualPage, params])

    return (
        <>
        <div className={`flex flex-col w-full pt-20 ${mangasError ? 'h-[100dvh]' : ''}`}>
            <section className="my-4 flex flex-col px-[4.2rem] gap-y-2">
                <div className="text-[20px] md:text-[24px] flex flex-row items-center gap-x-[1rem]">
                    <strong>{category.name}</strong>
                </div>
            </section>

            <section ref={mangasRef} className={`${mangasError ? 'px-[4.2rem]' : ''}`}>
                {isLoading && 
                    <CategoryLoading />                }
                {!isLoading && mangas !== null && !mangasError &&
                    <FullCardList data={mangas.data} pagination={mangas.pagination}/>
                }
                {mangas !== null && !isFiltered && !mangasError &&
                <article className="flex justify-center my-8">
                    <CategoryPagination pagination={mangas.pagination} actions={{changePage}}/>
                </article>
                }
            </section>
        </div>
        </>
    )
}

export default TopMangaPage;
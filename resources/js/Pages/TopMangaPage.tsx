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
            console.error('The error is: ' + error)
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
        } else {
            console.log('There is not need to fetch the data.');
        }
    }, [])

    useEffect(() => {
        runFetch(params);
        console.log(mangas);
    }, [actualPage, params])

    return (
        <>
        <div className="flex flex-col bg-black w-full">
            <section className="my-4 flex flex-col px-[4.2rem] gap-y-2">
                <div className="text-[20px] md:text-[24px] flex flex-row items-center gap-x-[1rem]">
                    <button className="rounded-[50%] cursor-pointer transition duration-300 ease-in-out  hover:bg-[#363636d6] w-[2.5rem] h-[2.5rem] flex justify-center items-center">
                        <a href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M3.283 10.94a1.5 1.5 0 0 0 0 2.12l5.656 5.658a1.5 1.5 0 1 0 2.122-2.122L7.965 13.5H19.5a1.5 1.5 0 0 0 0-3H7.965l3.096-3.096a1.5 1.5 0 1 0-2.122-2.121z"/></g></svg>
                        </a>
                    </button>
                    <strong>{category.name}</strong>
                </div>
            </section>

            <section ref={mangasRef}>
                {isLoading && 
                    <CategoryLoading />                }
                {!isLoading && mangas !== null &&
                    <FullCardList data={mangas.data} pagination={mangas.pagination}/>
                }
                {mangas !== null && !isFiltered &&
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
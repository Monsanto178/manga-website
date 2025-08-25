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
    order_by: OrderBy | null;
    query:string | null;
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
        items?: {total:number};
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
    query:string | null;
}

const CategoryMangaPage = (category:Category) => {
    const defaultParams = {
        page: category.page, 
        genreId: category.mal_id,
        sort:'desc',
        order_by: category.order_by,
        type: category.type,
        status: category.status,
        query: category.query
    }

    const [isLoading, setLoading] = useState(true);
    const [actualPage, setActualPage] = useState(category.page);
    const [mangas, setMangas] = useState<Mangas | null>(null);
    const mangasRef = useRef<HTMLElement>(null);

    const [orderBy, setOrderBy] = useState<OrderBy | null>(category.order_by);
    const [status, setStatus] = useState<Status | null>(category.status);
    const [type, setType] = useState<Type | null>(category.type);

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

    const typeEnum = ["manga", "novel", "lightnovel", "oneshot", "doujin", "manhwa", "manhua"];
    const statusEnum = ['publishing', 'complete', 'discontinued', 'hiatus', 'upcoming'];
    const orderEnum = ['score', 'start_date', 'popularity', 'title'];

    const isType = (val:string): val is Type => typeEnum.includes(val);
    const isStatus = (val:string): val is Status => statusEnum.includes(val);
    const isOrder = (val:string): val is OrderBy => orderEnum.includes(val);

    const updateUrl = (page:string) => {
        let baseUrl = window.location.href.split('?')[0];
        baseUrl += category.query ? `?q=${category.query}&page=${page}` : `?page=${page}`;
        if(type !== null)   {baseUrl += `&type=${type}`};
        if(status !== null) {baseUrl += `&status=${status}`};
        if(orderBy !== null){baseUrl += `&order_by=${orderBy}`};

        history.pushState(null,'', baseUrl);
    }

    const changeOrder = (order:Type|OrderBy|Status) => {
        if (isType(order)) {
            if (order === type) {
                setType(null);
            } else {
                setType(order);
            }
        } else if(isStatus(order)) {
            if (order === status) {
                setStatus(null);
            } else {
                setStatus(order);
            }
        }else if(isOrder(order)) {
            if (order === orderBy) return;
            setOrderBy(order);
        }
    }

    const applyFilter = () => {
            setActualPage('1');
            setParams( prev => ({...prev, page:'1', order_by:orderBy, status: status, type:type}))
            setLoading(true);
            setFiltered(true);
            updateUrl('1');
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
        <div className="flex flex-col w-full">
            <section className="my-4 flex flex-col px-[4.2rem] pt-20 gap-y-2">
                <div className="text-[22px] md:text-[32px] sm:text-[26px] flex flex-row items-center gap-x-[1rem]">
                    <strong>{category.query ? `Search results for: "${category.query}" (${mangas?.pagination.items?.total ? mangas?.pagination.items?.total : 0} results)` :category.name}</strong>
                </div>
            </section>

            <section className="my-8 flex flex-col px-[4.2rem] gap-y-2">
                <OrderCard props={{actualType:type, actualOrder:orderBy, actualStatus:status, actions:{changeOrder, applyFilter}}}/>
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

export default CategoryMangaPage;
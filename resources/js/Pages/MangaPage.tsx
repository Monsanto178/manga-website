import { StatsCardList, AuthorCard, CharacterList, LoadingBanner, ReviewCardList, ErrorMangaCard} from '../Components';
import { MangaBanner, CardList} from '../Components';

import { useEffect, useRef, useState } from 'react';
import { RelatedCardList } from '../Components/RelatedCard/RelatedCardList';
import { AuthorType, CharacterType, FullMangaType, MangaType, ReviewType, RelatedMangaType} from '../Types';

type ParsedManga = {
    mal_id:number;
    type:string;
    relation:string;
}
type PlainManga = {
    mal_id:number;
    type:string;
    name:string;
}

type PlainRel = {
    entry: Array<PlainManga>
    relation: string;
}

type Author = {
    mal_id: number;
    name:string;
}

type InfoCard = {
    titles: Array<{type:string, title:string}>;
    themes: Array<{mal_id:number, type:string, name:string}>;
    demographics: Array<{mal_id:number, type:string, name:string}>;
    serializations: Array<{mal_id:number, type:string, name:string}>;
    external: Array<{name:string, url:string}>;
    chapters: number | null;
    volumes: number | null;
    score: number | null;
    favorites: number | null;
    rank: number | null;
    published: string;
}

type Reviews = {
    data: ReviewType[];
    pagination?: {has_next_page:boolean;}
}

interface firstProp {
    mangaId: string;
}



const MangaPage= ({mangaId} : firstProp): React.JSX.Element  => {
    const [manga, setManga] = useState<FullMangaType | null>(null);
    const [loadingManga, setLoadingManga] = useState(true);
    const [mangaErrors, setMangaErros] = useState(false);

    const [recommendation, setRecommendations] = useState<MangaType | null>(null);
    const [halfRecommend, setHalfRecommend] = useState<MangaType[] | null>(null)
    const [loadingRecommend, setLoadingRecommend] = useState(true);
    const [recommendationError, setRecommendError] = useState(false);

    const [related, setRelated] = useState<RelatedMangaType[] | null>(null);
    const [parsedRel, setParsedRel] = useState<ParsedManga[] | null>(null);
    const [relatedError, setRelatedError] = useState(false);
    const [loadingRel, setLoadingRel] = useState(true);

    const [characters, setCharacters] = useState<CharacterType[] | null>(null);
    const [charactersError, setCharactersError] = useState(false);
    const [loadingChars, setLoadingChars] = useState(true);

    const [authors, setAuthors] = useState<AuthorType[] | null>(null);
    const [authorsError, setAuthorsError] = useState(false);
    const [loadingAuthors, setLoadingAuthors] = useState(true);

    const [reviews, setReviews] = useState<Reviews | null>(null);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [reviewsError, setReviewError] = useState(false);
    const [reviewPage, setReviewPage] = useState<number>(0);

    const [information, setInfo] = useState<InfoCard | null>(null);
    

    // const titles = {kind:'title', values:manga?.titles};
    type TabOption = 'information' | 'authors' | 'characters' | 'related' | 'review';
    const [statOpt, setStatOpt] = useState<TabOption>('information');

    
    const changeOpt = (opt:TabOption) => {
        if (opt === statOpt) return;
        setStatOpt(opt);
    }

    const getCsrfToken = async () => {
        const response = await fetch('/csrf-token');
        const data = await response.json();
        return data.csrf_token;
    };

    const fetchGetData = async (endpoint:string) => {
        try {
            const petition = await fetch(endpoint);
            if (!petition.ok) throw new Error("Error has been detected."); 

            const response = await petition.json();
            return response.data;
        } catch (error) {
            return {error:true};
        }
    }

    const fetchPostData = async (endpoint:string, body:string) =>  {
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
            return response;
        } catch (error) {
            return {error:true}
        }
    }
    function transformRelations (obj:PlainRel[]):ParsedManga[] {
        return obj.flatMap(rel => 
            rel.entry.map(e => ({
                mal_id: e.mal_id,
                type:e.type,
                relation: rel.relation,
            }))
        )
    }

    function createInfoCard() {
        if(!manga) return
        const infoCard = {
            titles: manga.titles,
            themes: manga.themes,
            demographics: manga.demographics,
            serializations: manga.serializations,
            external: manga.external,
            chapters: manga.chapters,
            volumes: manga.volumes,
            favorites: manga.favorites,
            score: manga.score,
            rank: manga.rank,
            published: manga.published.string
        }
        setInfo(infoCard);
    }

    function mixArray(array : MangaType[]) {
        const mixedArr = [...array];
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            [mixedArr[i], mixedArr[j]] = [mixedArr[j], mixedArr[i]]
        }
        return mixedArr;
    }


    async function runRelatedFetch() {
        
        if(!manga) return
        const dataToSend = transformRelations(manga.relations)
        setParsedRel(dataToSend);

        const enpoint = `/mangas/manga/related`;
        const body = JSON.stringify({data: dataToSend});
        const data = await fetchPostData(enpoint, body)
        if (!data.error) {
            setRelated(data);
        } else {
            setRelatedError(true);
        }
        setLoadingRel(false);
    }

    async function runMangaFetch() {
        const endpoint = `/mangas/manga/getManga`;
        const body = JSON.stringify({mangaId: mangaId});

        const data = await fetchPostData(endpoint, body);
        
        if (!data.error) {
            setManga(data);
        } else {
            setMangaErros(true);
        }
        setLoadingManga(false);
    }
    if (mangaErrors) {
        throw new Error("Upsie... I did something wrong.");
    }

    async function runCharFetch() {
        if(!manga) return
        const endpoint = `/mangas/manga/${manga.mal_id}/characters`;
        const response = await fetchGetData(endpoint);
        if (!response.error) {
            setCharacters(response);
        } else {
            setCharactersError(true);
        }
        setLoadingChars(false);
    }

    async function runAuthorFetch() {
        if(!manga) return
        const endpoint = `/mangas/manga/getAuthors`;
        const ids = manga.authors.map((person:Author) => person.mal_id);
        
        const body = JSON.stringify({authors_ids: ids, manga_id: manga.mal_id})

        const data = await fetchPostData(endpoint, body);
        if (!data.error) {
            setAuthors(data)            
        } else {
            setAuthorsError(true);
        }
        setLoadingAuthors(false);
    }
    console.log(recommendationError);
    

    async function runRecommendFetch() {
        const endpoint = `/mangas/manga/getRecommendations`;
        if (!manga) return;
        const body = JSON.stringify({mangaId: manga.mal_id});
    
        const data = await fetchPostData(endpoint, body);
        if (!data.error) {
            if (data.length > 10) {
                const mixedData = mixArray(data);
                setHalfRecommend(mixedData.slice(0, 10));
            }
            setRecommendations(data);    
        } else {
            setRecommendError(true);
        }
        
        setLoadingRecommend(false)
    }

    async function runReviews() {
        const endpoint = '/mangas/manga/reviews';
        const page = reviewPage === 0 ? 1 : reviewPage;
        const body = JSON.stringify({mangaId: manga?.mal_id, page:page});

        const data = await fetchPostData(endpoint, body);
        if (!data.error) {
            setReviews(data);
        } else {
            setReviewError(true);
        }
        
        setLoadingReviews(false);
    }

    const reviewRef = useRef<HTMLElement>(null)

    const scrollTo = () => {
        if (reviewRef.current) {
            const y = reviewRef.current.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: y-150,
                behavior: 'instant',
            });
        }
    }

    function changeReviewPage(page:number) {
        setReviewPage(page);
        scrollTo();
    }

    useEffect(() => {
        switch (statOpt) {
            case 'characters':
                if (characters === null) {
                    runCharFetch();
                }
                break;
            case 'authors':
                if (authors === null) {
                    runAuthorFetch();
                }
                break;
            case 'review':
                if (reviews === null) {
                    setReviewPage(1);
                    runReviews();
                }
            default:
                break;
        }
    }, [statOpt])

    useEffect(() => {
        if (reviewPage !== 0 && reviews !== null) {
            setReviews(null);
            runReviews();
        }
    }, [reviewPage])

    useEffect(() => {
        runMangaFetch();
    }, [])

    useEffect(() => {
        createInfoCard();
        runRecommendFetch();
        if (related === null) {
            runRelatedFetch();
        }
    }, [manga])
    
    return (
        <>
        <div className='w-full h-full relative pt-10'>
            {manga && !mangaErrors && !loadingManga &&
                <>
                <section className='overflow-hidden flex flex-nowrap z-2 py-0 px-0 lg:px-[5rem] py-[3rem]'>
                    <MangaBanner manga={manga}></MangaBanner>
                </section>
                <section className='absolute inset-0 z-1'>
                    <div className='z-2 absolute w-full h-full inset-0 bg-gradient-to-b from-[#3c3c3cde] via-[#000000f2] to-[#000000]'></div>
                    <picture>
                        <img className='w-full h-full inset-0 absolute object-cover' src={manga.images.jpg.large_image_url} alt="" />
                    </picture>
                </section>
                <section className='relative z-11 pb-[8rem] px-0'>
                    <section className='relative flex w-full py-[2rem] mt-[3rem] flex justify-center z-11 text-[18px] sm:text-[20px] md:px-[7.5rem]'>
                        <article className='flex w-[100%] justify-around' style={{borderBottom:'1px solid white'}}>
                            <button onClick={() => changeOpt('information')} className={`transition-transform duration-600 flex justify-center w-[33%] p-2 cursor-pointer pb-2 ${statOpt === 'information' ? 'bg-[#3C91E6] font-bold' : 'hover:bg-[#3C91E6] hover:font-bold'}`}>
                                <span>Info</span>
                            </button>
                            <button onClick={() => changeOpt('authors')} className={`transition-transform duration-600 flex justify-center w-[33%] p-2 cursor-pointer pb-2 ${statOpt === 'authors' ? 'bg-[#3C91E6] font-bold' : 'hover:bg-[#3C91E6] hover:font-bold'}`}>
                                <span>Authors</span>
                            </button>
                            <button onClick={() => changeOpt('characters')} className={`transition-transform duration-600 flex justify-center w-[33%] p-2 cursor-pointer pb-2 ${statOpt === 'characters' ? 'bg-[#3C91E6] font-bold' : 'hover:bg-[#3C91E6] hover:font-bold'}`}>
                                <span>Characters</span>
                            </button>
                            <button onClick={() => changeOpt('related')} className={`transition-transform duration-600 flex justify-center w-[33%] p-2 cursor-pointer pb-2 ${statOpt === 'related' ? 'bg-[#3C91E6] font-bold' : 'hover:bg-[#3C91E6] hover:font-bold'}`}>
                                <span>Related</span>
                            </button>
                            <button onClick={() => {changeOpt('review'); scrollTo()}} className={`transition-transform duration-600 flex justify-center w-[33%] p-2 cursor-pointer pb-2 ${statOpt === 'review' ? 'bg-[#3C91E6] font-bold' : 'hover:bg-[#3C91E6] hover:font-bold'}`}>
                                <span>Reviews</span>
                            </button>
                        </article>
                    </section>

                    {statOpt === 'related' && 
                        <section className="relative z-11 my-0 mx-2 md:mx-[7.5rem] sm:mx-[1rem] pb-16">
                            {loadingRel && parsedRel !== null && !relatedError &&
                                <RelatedCardList prop={{plainMangas: parsedRel, setLoading:true}}/>
                            }
                            {!loadingRel && related !== null && !relatedError &&
                                <RelatedCardList prop={{mangas: related, setLoading:false}}/>
                            }
                            {!related && !loadingRel && !relatedError && 
                                <div className='bg-[#2D2D2D]'>
                                    <div className='mt-2 p-4 text-[16px]'>
                                        <span>No relations has been found</span>
                                    </div>
                                </div>
                            }
                            {!loadingRel && relatedError && 
                               <ErrorMangaCard />
                            }
                        </section>
                    }

                    {statOpt === 'authors' && 
                        <section className="relative z-11 my-0 mx-2 md:mx-[7.5rem] sm:mx-[1rem] pb-16">
                            {loadingAuthors && authors === null &&
                                <AuthorCard setLoading={true} entries={manga.authors}/>
                            
                            }
                            {!loadingAuthors && authors !== null &&
                                <AuthorCard setLoading={false} entries={authors}/>
                            }
                            {!loadingAuthors && !authors && !authorsError && 
                                <div className='bg-[#2D2D2D]'>
                                    <div className='mt-2 p-4 text-[16px]'>
                                        <span>No authors has been found</span>
                                    </div>
                                </div>
                            }
                            {!loadingAuthors && authorsError && 
                                <div className='p-4 w-full flex justify-center bg-[#2D2D2D] text-14 md:text-18 sm:text-16 mt-2 md:mt-6 sm:mt-4'>
                                    <span>Oops... Something went wrong.</span>
                                </div>
                            }
                        </section>
                        
                    }

                    {statOpt === 'characters' && 
                        <section className="relative z-11 my-0 mx-2 md:mx-[7.5rem] sm:mx-[1rem] pb-16">
                            {loadingChars && 
                                <article className='p-8 flex justify-center align-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                                </article>
                            }
                            {!loadingChars && characters !== null &&
                                <CharacterList charList={characters} limitPerPage={20}/>
                            }
                            {!loadingChars && !characters && !charactersError && 
                                <div className='bg-[#2D2D2D]'>
                                    <div className='mt-2 p-4 text-[16px]'>
                                        <span>No reviews has been found</span>
                                    </div>
                                </div>
                            }
                            {!loadingChars && charactersError && 
                               <ErrorMangaCard />
                            }
                        </section>
                    }

                    {statOpt === 'information' && 
                        <section className='my-0 gap-y-[2rem] flex justify-between flex-wrap md:px-[7.5rem]'>
                            {information !== null && 
                            <StatsCardList props={information}/>
                            }
                        </section>
                    }
                    {statOpt === 'review' && 
                        <section ref={reviewRef} className='my-0 md:px-[7.5rem]'>
                            {reviews && !loadingReviews &&
                                <ReviewCardList showManga={false} reviews={reviews.data} pagination={reviews.pagination} actual_page={reviewPage} changePage={changeReviewPage}/>
                            }
                            {loadingReviews && 
                                <article className='p-8 flex justify-center align-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                                </article>
                            }
                            {!reviews && !reviewsError && !loadingReviews && 
                                <div className='bg-[#2D2D2D]'>
                                    <div className='mt-2 p-4 text-[16px]'>
                                        <span>No reviews has been found</span>
                                    </div>
                                </div>
                            }
                            {!loadingReviews && reviewsError && 
                               <ErrorMangaCard />
                            }
                        </section>
                    }

                </section>

                <section className="relative z-11 my-0 mx-2 md:mx-[7.5rem] sm:mx-[1rem] pb-16">
                    <div className="text-[26px] sm:text-[32px] mt-4">
                        <strong>Recommendations</strong>
                    </div>
                    {halfRecommend && !loadingRecommend && !recommendationError &&  <CardList manga={halfRecommend} />}
                    {!halfRecommend && loadingRecommend && 
                        <article className='p-8 flex justify-center align-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                        </article>
                    }
                    {!halfRecommend && !loadingRecommend && !recommendationError &&
                        <div className='bg-[#2D2D2D]'>
                            <div className='mt-2 p-4 text-[16px]'>
                                <span>No recommendation has been found</span>
                            </div>
                        </div>
                    }
                    {!loadingRecommend && recommendationError &&
                        <div className='p-4 w-full flex justify-center bg-[#2D2D2D] text-14 md:text-18 sm:text-16 mt-2 md:mt-6 sm:mt-4'>
                            <span>Oops... Something went wrong.</span>
                        </div>
                    }
                </section>
                </>
            }
            {!manga && loadingManga && !mangaErrors &&
                <section className='flex flex-col w-full gap-y-14 justify-center z-2 py-0 px-0 lg:px-[5rem] py-[4rem]'>
                    <LoadingBanner />
                    <article className='p-8 flex justify-center align-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                    </article>
                </section>
            }
        </div>

        </>
    )
};

export default MangaPage
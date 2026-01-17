import cover_img from '@/assets/images/flcl.png';
import { CardList, ErrorMangaCard, SearchResult } from '@/Components';
import { useEffect, useRef, useState } from 'react';
import { MangaType } from '@/Types';

const Home= (): React.JSX.Element  => {
    const [topMangas, setTopMangas] = useState<MangaType[]>([]);
    const [populars, setPopulars] = useState<MangaType[]>([]);
    const [recents, setRecents] = useState<MangaType[]>([]);
    const [recommendations, setRecommentions] = useState<MangaType[]>([]);

    const [topError, setTopError] = useState(false);
    const [popularError, setPopularError] = useState(false);
    const [recentError, setRecentError] = useState(false);
    const [recommendError, setRecommendError] = useState(false);


    const [loadingRec, setLoadingRec] = useState(true);
    const [loadingRecent, setLoadingRecent] = useState(true);
    const [loadingTop, setLoadingTop] = useState(true);
    const [loadingPop, setLoadingPop] = useState(true);


    const fetchData = async(endpoint:string) => {
        try {
            const res = await fetch(endpoint);
            if(!res.ok) throw new Error("");
            const mangas = await res.json();

            return {data: mangas.data, error:false};
        } catch (error) {
            console.error(error);
            return {error:true}
        }
    }

    const fetchPopular = async() => {
        const endpoint = '/mangas/popular';

        const response = await fetchData(endpoint);
        if(response.error) {
            setPopularError(true);
            setLoadingPop(false);
            return
        }
        setPopulars(response.data);
        setLoadingPop(false);
    }
    
    const fetchRecommend = async() => {
        const endpoint = '/mangas/recommendation';

        const response = await fetchData(endpoint);
        if(response.error) {
            setRecommendError(true);
            setLoadingRec(false);
            return
        }
        setRecommentions(response.data);
        setLoadingRec(false)
    }
    const fetchTop = async() => {
        const endpoint = '/mangas/top';

        const response = await fetchData(endpoint);
        if (response.error) {
            setTopError(true); 
            setLoadingTop(false);
            return
        }
        setTopMangas(response.data);
        setLoadingTop(false)
    }
    const fetchRecent = async() => {
        const endpoint = '/mangas/recent'

        const response = await fetchData(endpoint);
        if(response.error) {
            setRecentError(true);
            setLoadingRecent(false);
            return
        }
        setRecents(response.data);
        setLoadingRecent(false);
    }

    useEffect(() => {
        
        fetchTop();
        fetchPopular();

        setTimeout(() => {
            fetchRecent();
            fetchRecommend();
        }, 1000);
    }, []);

    return (
        <>
        <section className='flex flex-col relative'>
            <section className='relative bg-cover bg-center w-full h-[60vh] flex-shrink-0 flex-grow-0 py-[1rem] px-[2rem]' style={{backgroundImage:`url(${cover_img})` }}>
                <div className='absolute bottomm-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-[#111111]'></div>
            </section>
            

            <section className='flex justify-center  text-[20px] sm:text-[24px] my-4 mx-2 lg:mx-[4rem] md:mx-[2rem] sm:mx-[1rem] mt-0 border-b-1 border-white'>
                <div className='w-full p-2 pb-0 tansition-transform duration-600 bg-[#3C91E6] font-bold'>
                    <a href="/" className='w-full flex justify-center p-2'>
                        <strong>Home</strong>
                    </a>
                </div>
                <div className='w-full p-2 pb-0 tansition-transform duration-600 flex hover:bg-[#3C91E6] font-bold '>
                    <a href="/mangas/manga/random" className='w-full flex justify-center p-2'>
                        <strong>Random</strong>
                    </a>
                </div>
                <div className='w-full p-2 pb-0 tansition-transform duration-600 flex hover:bg-[#3C91E6] font-bold '>
                    <a href="/tags" className='w-full flex justify-center p-2'>
                        <strong>Tags</strong>
                    </a>
                </div>
                <div className='w-full p-2 pb-0 tansition-transform duration-600 flex hover:bg-[#3C91E6] font-bold '>
                    <a href="/reviews" className='w-full flex justify-center p-2'>
                        <strong>Reviews</strong>
                    </a>
                </div>
            </section>

            <section className="my-0 mx-2 lg:mx-[4rem] md:mx-[2rem] sm:mx-[1rem] mangaContainer">
                <div className="flex justify-between  text-[18px] sm:text-[22px] mt-4 mx-4">
                    <div>
                        <strong>Top</strong>
                    </div>
                    <a href="/tags/top" className='rounded-[50%] cursor-pointer transition duration-300 ease-in-out  hover:bg-[#363636d6] w-[3rem] h-[3rem] flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m15.06 5.283l5.657 5.657a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 0 1-2.122-2.122l3.096-3.096H4.5a1.5 1.5 0 0 1 0-3h11.535L12.94 7.404a1.5 1.5 0 0 1 2.122-2.121Z"/></g></svg>
                    </a>
                </div>
                {loadingTop && <CardList manga={null}></CardList>}
                {!loadingTop && !topError && <CardList manga={topMangas}></CardList>}
                {!loadingTop && topError && 
                    <ErrorMangaCard />
                }
            </section>

            <section className="my-0 mx-2 lg:mx-[4rem] md:mx-[2rem] sm:mx-[1rem] mangaContainer">
                <div className="flex justify-between  text-[18px] sm:text-[22px] mt-4 mx-4">
                    <div>
                        <strong>Populars</strong>
                    </div>
                    <a href="/tags/all?order_by=popularity" className='rounded-[50%] cursor-pointer transition duration-300 ease-in-out  hover:bg-[#363636d6] w-[3rem] h-[3rem] flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m15.06 5.283l5.657 5.657a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 0 1-2.122-2.122l3.096-3.096H4.5a1.5 1.5 0 0 1 0-3h11.535L12.94 7.404a1.5 1.5 0 0 1 2.122-2.121Z"/></g></svg>
                    </a>
                </div>
                {loadingPop && <CardList manga={null}></CardList>}
                {!loadingPop && !popularError && <CardList manga={populars}></CardList>}
                {!loadingPop && popularError && 
                    <ErrorMangaCard />
                }
            </section>

            <section className="my-0 mx-2 lg:mx-[4rem] md:mx-[2rem] sm:mx-[1rem] mangaContainer">
                <div className="flex justify-between  text-[18px] sm:text-[22px] mt-4 mx-4">
                    <div>
                        <strong>Recents</strong>
                    </div>
                    <a href="/tags/all?order_by=start_date" className='rounded-[50%] cursor-pointer transition duration-300 ease-in-out  hover:bg-[#363636d6] w-[3rem] h-[3rem] flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m15.06 5.283l5.657 5.657a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 0 1-2.122-2.122l3.096-3.096H4.5a1.5 1.5 0 0 1 0-3h11.535L12.94 7.404a1.5 1.5 0 0 1 2.122-2.121Z"/></g></svg>
                    </a>
                </div>
                {loadingRecent && <CardList manga={null}></CardList>}
                {!loadingRecent && !recentError && <CardList manga={recents}></CardList>}
                {!loadingRecent && recentError && 
                    <ErrorMangaCard />
                }
            </section>

            <section className="my-0 mx-2 lg:mx-[4rem] md:mx-[2rem] sm:mx-[1rem] mangaContainer">
                <div className=" text-[18px] sm:text-[22px] mt-4 mx-4">
                    <strong>Recommendations</strong>
                </div>
                {loadingRec && <CardList manga={null}></CardList>}
                {!loadingRec && !recommendError &&  <CardList manga={recommendations} />}
                {!loadingRec && recommendError && 
                    <ErrorMangaCard />
                }
            </section>
        </section>
        </>
    )
};

export default Home;
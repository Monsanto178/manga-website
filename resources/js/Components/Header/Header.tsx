import { useEffect, useRef, useState } from "react"
import gatito from '@/assets/images/Gatito.png';
import { SearchResult, SearchBar } from "@/Components";
import { MangaType } from "@/Types";

type SearchResult = {
    pagination:{
        last_visible_page:number;
        current_page:number;
        items:{
            total:number;
        }
    }
    data:Array<MangaType>;
}

interface Props {
    home?:boolean;
}

export const Header = ({home=false}:Props) => {
    const [searchMangas, setSearchMangas] = useState<SearchResult | null>(null);
    const [searchVal, setSearchVal] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef<HTMLElement>(null);
    const [visibleBar, setVisibleBar] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [atTop, setAtTop] = useState(true);

    const toggleVisibleBar = () => {
        setVisibleBar(prev => !prev);
    }
    const toggleShowMenu = () => {
        setShowMenu(prev => !prev);
    }

    const isAtTop = (): boolean => {
        useEffect(() => {
            const handScroll = () => {
                setAtTop(window.scrollY === 0);
            };
        
            window.addEventListener('scroll', handScroll);
            handScroll();

            return () => window.removeEventListener('scroll', handScroll)
        }, [])

        if(home) return false;
        return atTop;
    };

    const isSmall = (): boolean => {
        const [IsSmallPort, setIsSmallPort] = useState(false);

        useEffect(() => {
            const mediaQuery = window.matchMedia('(max-width: 639px)');

            const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
                setIsSmallPort(e.matches);
                if (!e.matches) {
                    setVisibleBar(false)
                }
            }

            handleChange(mediaQuery);

            mediaQuery.addEventListener('change', handleChange);

            return () => mediaQuery.removeEventListener('change', handleChange);
        },[setVisibleBar]);

        return IsSmallPort;
    }
    const smallPort = isSmall();
    const top = isAtTop();

    const getCsrfToken = async () => {
        const response = await fetch('/csrf-token');
        const data = await response.json();
        return data.csrf_token;
    };

    const fetchSearch = async(endpoint:string, body:{}) => {
        const csrf_token = await getCsrfToken();

        try {
            const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf_token,
            },
            body: JSON.stringify(body)
        });

        if(!response.ok) throw new Error("An error has occurred.");
        
        const data = await response.json();
        return data;

        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    }

    async function search(name:string) {
        setIsSearching(true);
        setSearchMangas(null);
        const endpoint = `/mangas/search`;
        const body = {name: name}
        
        const data = await fetchSearch(endpoint, body);
        setSearchMangas(data);
    }

    const handleSearchEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            search(searchVal);
        }
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])
    return (
        <>
        <header 
            onTouchStart={() => setIsHovered(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`h-15 w-full inset-0 z-90 flex justify-between items-center fixed px-2 md:px-12 sm:px-6 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-50'} ${top ? 'bg-transparent' : 'bg-[#0a0a0a] border-b-2 border-[#FF6740]'}`}>
            <article className={`${visibleBar ? 'hidden' : 'flex'} w-40 sm:w-60 h-15 items-end text-white`}>
                {/* Menu btn */}
                <div className="relative">
                    <button onClick={() => toggleShowMenu()} className="rounded-[50%] cursor-pointer transition duration-300 ease-in-out  hover:bg-[#363636d6] w-[2.5rem] h-[2.5rem] flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"/></svg>
                    </button>
                    {showMenu &&
                        <ul className="absolute top-[52px] flex flex-col justify-center items-center w-58 bg-[#2D2D2D]">
                            <li className="w-full flex">
                                <a className="w-full h-full flex gap-x-2 transition-all p-4 duration-300 ease-in-out hover:bg-[#3C91E6]" href="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4.5 21.5h15"/><path d="M4.5 21.5v-13.5M19.5 21.5v-13.5"/><path d="M2 10l10 -8l10 8"/><path d="M9.5 21.5v-9h5v9"/></g></svg>
                                    <strong>Home</strong>
                                </a>
                            </li>
                            <li className="w-full flex">
                                <a className="w-full h-full flex gap-x-2 transition-all p-4 duration-300 ease-in-out hover:bg-[#3C91E6]" href="/tags">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3.207 14.207a1 1 0 0 1 0-1.414l9.5-9.5A1 1 0 0 1 13.414 3H20a1 1 0 0 1 1 1v6.586a1 1 0 0 1-.293.707l-9.5 9.5a1 1 0 0 1-1.414 0zM19.8 10.503V4.2h-6.303l-9.3 9.3l6.303 6.303zM16 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3" stroke-width="0.2" stroke="currentColor"/></svg>
                                    <strong>Tags</strong>
                                </a>
                            </li>
                            <li className="w-full flex">
                                <a className="w-full h-full flex gap-x-2 transition-all p-4 duration-300 ease-in-out hover:bg-[#3C91E6]" href="/reviews">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="m16 8l1.912 3.703l4.088.594L19 15l1 4l-4-2.25L12 19l1-4l-3-2.703l4.2-.594z"/><path fill="currentColor" d="M17.736 30L16 29l4-7h6a1.997 1.997 0 0 0 2-2V8a1.997 1.997 0 0 0-2-2H6a1.997 1.997 0 0 0-2 2v12a1.997 1.997 0 0 0 2 2h9v2H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-4.835Z"/></svg>
                                    <strong>Reviews</strong>
                                </a>
                            </li>
                            <li className="w-full flex">
                                <a className="w-full h-full flex gap-x-2 transition-all p-4 duration-300 ease-in-out hover:bg-[#3C91E6]" href="//mangas/manga/random">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M4 17a1 1 0 0 1 0-2h2l3-3l-3-3H4a1.001 1.001 0 0 1 0-2h3l4 4l4-4h2V5l4 3.001L17 11V9h-1l-3 3l3 3h1v-2l4 3l-4 3v-2h-2l-4-4l-4 4z"/></svg>
                                    <strong>Random</strong>
                                </a>
                            </li>
                        </ul>
                    }
                </div>
                <a href='/' className='w-40 sm:w-50 h-15 flex items-center relative overflow-hidden' draggable={false}>
                    <picture className='flex w-15 h-15 z-2 absolute top-4'>
                        <img className='w-full' src={gatito} alt="Gatito" draggable={false}/>
                    </picture>
                    <div className='text-[24px] font-extrabold hidden sm:flex items-start absolute top-5 left-[4.1rem]'>
                        <strong>MangaTail</strong>
                    </div>
                </a>
            </article>

            <article ref={searchRef} className={`${visibleBar ? 'w-full justify-between' : ''} flex`}>
                <div className="relative flex">
                    <SearchBar 
                        searchVal={searchVal}
                        visibleBar={visibleBar}
                        smallPort={smallPort}
                        setSearchVal={setSearchVal}
                        onSearch={search}
                        onFocus={() => setIsVisible(true)}
                        onKeyDown={handleSearchEnter} 
                        toggleVisible={toggleVisibleBar}
                    />
                    <div className={`absolute ${(!visibleBar && smallPort) ? 'hidden' : 'block'} top-15`}>
                        {isVisible && searchMangas !== null &&
                            <SearchResult data={searchMangas?.data} pagination={searchMangas?.pagination} query={searchVal}/>
                        }
                        {isVisible && isSearching &&
                            <div className='flex flex-col p-4 items-center w-80 text-white overflow-hidden bg-[#2D2D2D]'>
                                <span>Searching for "<strong>{searchVal}</strong>"...</span>
                                <div className='flex justify-center align-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                

            </article>
        </header>
        </>
    )
}
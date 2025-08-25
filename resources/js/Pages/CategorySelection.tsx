import { useEffect, useState } from "react";
import { Tag } from "../Components";

type Tag = {
    mal_id:number;
    name:string;
    count:number;
}

type Data = {
    data: Tag[];
    errores: any;
}
const genres = [
  "Action", "Adventure", "Avant Garde", "Award Winning", "Boys Love",
  "Comedy", "Drama", "Fantasy", "Girls Love", "Gourmet", "Horror",
  "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports",
  "Supernatural", "Suspense", "Ecchi", "Erotica", "Hentai",
  "Historical", "Isekai", "Iyashikei", "Magical Sex Shift",
  "Mahou Shoujo", "Martial Arts", "Mecha", "Medical",
  "Psychological", "Reincarnation", "Samurai", "Space",
  "Strategy Game", "Super Power", "Time Travel", "Vampire",
  "Video Game", "Urban Fantasy"
];

const themes = [
  "Adult Cast", "Anthropomorphic", "CGDCT", "Childcare",
  "Combat Sports", "Crossdressing", "Delinquents", "Detective",
  "Educational", "Gag Humor", "Gore", "Harem", "High Stakes Game",
  "Idols (Female)", "Idols (Male)", "Love Polygon", "Memoir",
  "Military", "Music", "Mythology", "Organized Crime",
  "Otaku Culture", "Parody", "Performing Arts", "Pets",
  "Racing", "Reverse Harem", "Love Status Quo", "School",
  "Showbiz", "Survival", "Team Sports", "Villainess",
  "Visual Arts", "Workplace"
]

const demographics = [
  "Josei", "Kids", "Seinen", "Shoujo", "Shounen"
]

const All = [
    {
        category: 'Recents',
        endpoint: '/tags/all?order_by=start_date'
    },
    {
        category: 'Best Score',
        endpoint: '/tags/all?order_by=score'
    },
    {
        category: 'Populars',
        endpoint: '/tags/all?order_by=popularity'
    },
    {
        category: 'Alphabetical',
        endpoint: '/tags/all?order_by=title'
    },
    {
        category: 'Top Works',
        endpoint: '/tags/top'
    }
]


const CategorySelection = () => {
    const baseUrl = window.location.href.split('tag')[0]
    const [tags, setTags] = useState<Tag[] | null>(null);

    const getCsrfToken = async () => {
        const response = await fetch('/csrf-token');
        const data = await response.json();
        return data.csrf_token;
    };

    const fetchData = async() => {
        const csrf_token = await getCsrfToken();
        try {
            const response = await fetch('/tags/getAllTags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                },
                body: null
            });
            if(!response.ok) throw new Error("An error has occurred.");
            
            const data = await response.json();
            setTags(data);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        if(tags === null) { 
            fetchData() 
        }
    }, [])
    return (
        <>
            <section className="flex flex-col">
                <article className="flex flex-col my-4 px-[4.2rem] gap-y-2">
                    <div className="text-[20px] md:text-[24px] flex flex-row items-center gap-x-[1rem]">
                        <button className="rounded-[50%] cursor-pointer transition duration-300 ease-in-out  hover:bg-[#363636d6] w-[2.5rem] h-[2.5rem] flex justify-center items-center">
                            <a href={baseUrl}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M3.283 10.94a1.5 1.5 0 0 0 0 2.12l5.656 5.658a1.5 1.5 0 1 0 2.122-2.122L7.965 13.5H19.5a1.5 1.5 0 0 0 0-3H7.965l3.096-3.096a1.5 1.5 0 1 0-2.122-2.121z"/></g></svg>
                            </a>
                        </button>
                        <strong>Tags</strong>
                    </div>
                </article>

                {tags !== null && 
                <>
                <article className="flex flex-col my-4 px-[4.2rem] gap-4">
                    <div>
                        <strong>Genres</strong>
                    </div>
                    <ul className='flex flex-wrap gap-x-4 gap-y-6'>
                        {tags.map((tag) => {
                            return (
                                <>
                                {genres.includes(tag.name) &&
                                    <Tag data={tag} count={true}/>
                                }
                                </>
                            )
                        })}
                    </ul>
                </article>
                <article className="flex flex-col my-4 px-[4.2rem] gap-4">
                    <div>
                        <strong>Themes</strong>
                    </div>
                    <ul className="flex flex-wrap gap-4">
                        {tags.map((tag) => {
                            return (
                                <>
                                {themes.includes(tag.name) &&
                                    <Tag data={tag} count={true}/>
                                }
                                </>
                            )
                        })}
                    </ul>
                </article>
                <article className="flex flex-col my-4 px-[4.2rem] gap-4">
                    <div>
                        <strong>Demographics</strong>
                    </div>
                    <ul className="flex flex-wrap gap-4">
                        {tags.map((tag) => {
                            return (
                                <>
                                {demographics.includes(tag.name) &&
                                    <Tag data={tag} count={true}/>
                                }
                                </>
                            )
                        })}
                    </ul>
                </article>
                <article className="flex flex-col my-4 px-[4.2rem] gap-4">
                    <div>
                        <strong>All</strong>
                    </div>
                    <ul className="flex flex-wrap gap-4">
                        {All.map((tag) => {
                            return (
                                <>
                                <li className='text-[12px] lg:text-[16px] md:text-[14px]'>
                                    <a className="bg-[#2D2D2D] transition duration-300 ease-in-out hover:bg-[#FF6740] rounded-md sm:p-2 p-1 flex flex-col justify-center items-center w-[10rem]" href={tag.endpoint}>
                                        <strong>{tag.category}</strong>
                                    </a>
                                </li>
                                </>
                            )
                        })}
                    </ul>
                </article>
                </>
                }
                
            </section>
        </>
    )
}

export default CategorySelection;
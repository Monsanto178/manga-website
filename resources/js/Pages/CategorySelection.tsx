import { useEffect, useState } from "react";
import { Tag } from "@/Components";

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
    const [loadingTags, setLoadingTags] = useState(true);
    const [tagsError, setTagsError] = useState(false);

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
            setTagsError(true);
        } finally {
            setLoadingTags(false);
        }
    }
    
    if(tagsError) throw new Error("Something went wrong here.");
    

    useEffect(() => {
        if(tags === null) { 
            fetchData() 
        }
    }, [])
    return (
        <>
            <section className="flex flex-col">
                <article className="flex flex-col my-4 px-[4.2rem] pt-20 gap-y-2">
                    <div className="text-[20px] md:text-[24px] flex flex-row items-center gap-x-[1rem]">
                        <strong>Tags</strong>
                    </div>
                </article>

                <article className="flex flex-col my-4 px-[4.2rem] gap-4">
                    <div>
                        <strong>Genres</strong>
                    </div>
                    {tags && !loadingTags && 
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
                    }
                    {!tags && loadingTags && 
                        <div className='p-8 flex justify-center align-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                        </div>
                    }
                </article>
                <article className="flex flex-col my-4 px-[4.2rem] gap-4">
                    <div>
                        <strong>Themes</strong>
                    </div>
                    {tags && !loadingTags && 
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
                    }
                    {!tags && loadingTags && 
                        <div className='p-8 flex justify-center align-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                        </div>
                    }
                </article>
                <article className="flex flex-col my-4 px-[4.2rem] gap-4">
                    <div>
                        <strong>Demographics</strong>
                    </div>
                    {tags && !loadingTags && 
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
                    }
                    {!tags && loadingTags && 
                        <div className='p-8 flex justify-center align-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                        </div>
                    }
                </article>
                <article className="flex flex-col my-4 px-[4.2rem] gap-4">
                    <div>
                        <strong>All</strong>
                    </div>
                    {tags && !loadingTags && 
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
                    }
                    {!tags && loadingTags && 
                        <div className='p-8 flex justify-center align-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                        </div>
                    }
                </article>
            </section>
        </>
    )
}

export default CategorySelection;
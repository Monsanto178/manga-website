import { ChapterTagList, MangaSideCard, Tag, TagList, StatsCardList, RelatedCard, AuthorCard, CharacterList } from '../Components';
import { CardList } from '../Components';
import { GenreCardList } from '../Components';
import { Banner, MangaBanner} from '../Components';

import { usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';
import { RelatedCardList } from '../Components/RelatedCard/RelatedCardList';

interface Manga {
    mal_id:number;
    images:{
        jpg:{image_url:string, small_image_url:string, large_image_url?:string},
        webp:{image_url:string, small_image_url:string, large_image_url?:string}
    };
    status:string;
    publishing?:boolean;
    published?: {
        prop:{
            from:{
                day:number,
                month:number,
                year:number
            },
            to?:{
                day:number,
                month:number,
                year:number
            }
        }
    };
    title:string;
    synopsis:string;
    background?:string;
    titles:{
        type:string, 
        title:string
    };
    type?:string;
    authors?:[
        {
            mal_id:number,
            type:string,
            name:string
        }
    ]
    volumes?:number;
    chapters?:number;
    genres:[
        {
            mal_id:number,
            type:string,
            name:string
        }
    ];
    themes:[
        {
            mal_id:number,
            type:string,
            name:string
        }
    ];
    demographics:[
        {
            mal_id:number,
            type:string,
            name:string
        }
    ];
    serializations:[
        {
            mal_id:number,
            type:string,
            name:string
        }
    ];
    relations:[
        {
            relation:string,
            entry:[
                {
                    mal_id:number,
                    type:string,
                    name:string,
                    url:string
                }
            ]
        }
    ]
    external?:[
        {
            name:string,
            url:string
        }
    ]
}

interface MangaContainer {
    manga: Manga;
}


const MangaPage= (): React.JSX.Element  => {
    const {manga} = usePage().props as unknown as PageProps & {
        manga:any;
    }
    const titles = {kind:'title', values:manga.titles};
    // console.log(manga);
    type TabOption = 'information' | 'authors' | 'characters' | 'related';
    const [statOpt, setStatOpt] = useState<TabOption>('information');


    const changeOpt = (opt:TabOption) => {
        if (opt === statOpt) return;
        setStatOpt(opt);
    }

    const fetchData = () => {
        const opt = ``;
    }

    useEffect(() => {
        // console.log(statOpt);
        switch (statOpt) {
            case 'information':
                console.log('info');
                
                break;
            case 'characters':
                console.log('char');
                break;
            case 'authors':
                // const authors:Array<number> = manga.authors.length>0 ? manga.authors.map((author:{mal_id:number}) => author.mal_id) : '';
                // console.log(authors);
                
                console.log('author');
                break;
            case 'related':

                console.log('relacionado');
                break;
            default:
                break;
        }
    }, [statOpt])
    
    return (
        <>
        <div className='w-full h-full relative'>
            <section className='overflow-hidden flex flex-nowrap z-2 py-0 px-0 lg:px-[5rem] py-[3rem]'>
                <MangaBanner manga={manga}></MangaBanner>
            </section>
            <section className='absolute inset-0 z-1'>
                <div className='z-2 absolute w-full h-full inset-0 bg-gradient-to-b from-[#3c3c3cde] via-[#000000f2] to-[#000000]'></div>
                <picture>
                    <img className='w-full h-full inset-0 absolute object-cover' src={manga.images.jpg.large_image_url} alt="" />
                </picture>
            </section>
            <section className='relative text-white z-11 pb-[8rem] px-0'>
                <section className='relative flex w-full py-[2rem] mt-[3rem] flex justify-center z-11 text-[18px] sm:text-[20px] md:px-[7.5rem]'>
                    <article className='flex w-[100%] justify-around' style={{borderBottom:'1px solid white'}}>
                        <button onClick={() => changeOpt('information')} className={`transition-transform duration-600 flex justify-center w-[33%] p-2 cursor-pointer pb-2 ${statOpt === 'information' ? 'bg-[#3C91E6] font-bold' : 'hover:bg-[#3C91E6] hover:font-bold'}`}>
                            <span>Information</span>
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
                    </article>
                </section>

                {statOpt === 'related' && 
                    <section>
                        {<RelatedCardList relations={manga.relations}/>}
                    </section>
                }

                {statOpt === 'authors' && 
                    <div>
                        <div>
                            <h2>AUTHORS</h2>
                        </div>
                        <AuthorCard manga_id={manga.mal_id} entries={manga.authors}/>
                    </div>
                    
                }

                {statOpt === 'characters' && 
                    <CharacterList mal_id={manga.mal_id} limitPerPage={20}/>
                }

                {statOpt === 'information' && 
                    <section className='my-0 gap-y-[2rem] flex justify-between flex-wrap md:px-[7.5rem]'>
                        <article className='min-w-[345px] w-full'>
                            <div className='text-[18px] mb-4 mx-4 sm:mx-0'>
                                <h2>Titles</h2>
                            </div>
                            <div className='flex flex-wrap  justify-between gap-x-[10%] p-4 bg-[#2D2D2D]'>
                                {<StatsCardList kind='title' values={titles.values} />}
                            </div>
                        </article>

                        <article className='min-w-[345px] w-full'>
                            <div className='text-[18px] mb-4 mx-4 sm:mx-0'>
                                <h2>Information</h2>
                            </div>
                            <div className='flex flex-wrap bg-[#2D2D2D] justify-between gap-x-[10%] gap-y-[1.5rem] p-4'>
                                {<StatsCardList kind='simple' values={{chapters:manga.chapters, volumes:manga.volumes}} />}
                                <div className='flex flex-col w-70' >
                                    <strong>Published</strong>
                                    <span>{manga.published.string}</span>
                                </div>   
                                {<StatsCardList kind='tag' title='Themes' values={manga.themes} />}
                                {<StatsCardList kind='tag' title='Demographic' values={manga.demographics} />}
                                {<StatsCardList kind='tag' title='Serialization' values={manga.serializations} />}                 
                            </div>
                        </article>

                        
                        <article className='min-w-[345px] w-full'>
                            <div className='text-[18px] mb-4 mx-4 sm:mx-0'>
                                <h2>External Links</h2>
                            </div>
                            <div className='flex flex-wrap bg-[#2D2D2D] justify-between gap-x-[10%] p-4'>
                                {<StatsCardList kind='external' values={manga.external} />}
                            </div>
                        </article>
                    </section>
                }

            </section>
        </div>

        </>
    )
};

export default MangaPage
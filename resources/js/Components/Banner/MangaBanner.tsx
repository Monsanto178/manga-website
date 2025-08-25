import { useState } from "react";
import { TagList } from "../Tag/TagList";

interface Tag {
    key:number;
    name: string;
}

interface Card {
    title:string;
    cover:string;
    status:string;
    description?:string;
}

interface Manga {
    mal_id:number;
    images:{
        jpg:{image_url:string, small_image_url:string, large_image_url?:string},
        webp:{image_url:string, small_image_url:string, large_image_url?:string}
    };
    status:string;
    publishing:boolean;
    published: {
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
        string: string;
    };
    title:string;
    synopsis:string;
    background?:string;
    titles:Array<{type:string, title:string}>;
    type:string;
    authors:
        Array<{
            mal_id:number,
            type:string,
            name:string
        }>
    score: number | null;
    favorites: number | null;
    rank: number | null;
    volumes:number | null;
    chapters:number | null;
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
    demographics:
        Array<{
            mal_id:number,
            type:string,
            name:string
        }>;
    serializations:
        Array<{
            mal_id:number,
            type:string,
            name:string
        }>;
    relations:
        Array<{
            relation:string,entry:Array<{mal_id:number,type:string,name:string,url:string}>
        }>
    external:Array<{name:string,url:string}>
}

interface MangaContainer {
    manga: Manga;
}

export const MangaBanner = ({manga} : MangaContainer) => {
    const cover = manga.images.jpg.large_image_url ? manga.images.jpg.large_image_url : manga.images.jpg.image_url; 
    let status_color = "#4CAF50";
    switch (manga.status) {
        case 'Finished':
            status_color = "#2196F3"
            break;
        case 'On Hiatus':
            status_color = "#FFC107"
            break;
        case 'Cancelled':
            status_color = "#F44336"
            break;
        case 'Upcoming':
            status_color = "#9C27B0"
            break;
        default:
            break;
    }

    return (
        <>
        <article className='relative bg-cover bg-center w-full h-full flex-shrink-0 flex-grow-0' style={{backgroundImage:`url(${cover})` }}>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/100'></div>
            <div className='absolute inset-0 bg-black/30' style={{filter:'blur(120px)'}}></div>
            <div className="flex flex-col  text-white py-0 sm:py-[2rem] p-0 sm:p-[1.5rem] relative z-10 gap-y-[3rem]">
                {/* md:!h-[40vh] h-[22vh]    en picture:  !h-[10rem] md:!h-full !w-auto max-w-[50%]*/}
                <div className='flex justify-start gap-x-[1.5rem]'>
                    <picture className='group flex items-start relative mb-auto select-none min-w-[160px] w-full h-full 
                                        max-w-[50%] max-h-[350px] md:!max-w-[210px] sm:!max-height-[320px] sm:!max-width-[180px] aspect-[6/12] object-top object-cover bg-transparent rounded-md overflow-hidden'>
                        <img src={manga.images.webp.image_url} alt="banner_img" className='h-full w-full'/>
                    </picture>
                    <div className="max-w-[40%] md:!max-w-full">
                        <div className='flex flex-col justify-between h-full gap-y-[1.5rem]'>
                            <div>
                                <div className='text-[26px] lg:text-[30px]'>
                                    <h3>{manga.title}</h3>
                                </div>
                                <div className='flex flex-col items-start sm:flex-row sm:items-center text-[14px] sm:text-[16px] gap-x-4'>
                                    <div className="flex items-center">
                                        <svg className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path fill={status_color} d="M960 256q115 0 221 30t198 84t169 130t130 168t84 199t30 221q0 115-30 221t-84 198t-130 169t-168 130t-199 84t-221 30q-115 0-221-30t-198-84t-169-130t-130-168t-84-199t-30-221q0-115 30-221t84-198t130-169t168-130t199-84t221-30"/></svg>
                                        <span className='p-2'>{manga.status}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="m102.594 25.97l90.062 345.78L481.844 395L391.75 49.22zm-18.906 1.593c-30.466 11.873-55.68 53.098-49.75 75.312l3.25 11.78c.667-1.76 1.36-3.522 2.093-5.28C49.19 85.668 65.84 62.61 89.657 50.47l-5.97-22.907zm44.937 18.906l247.813 21.593l80.937 305.156l-249.344-20.064L128.626 46.47zM94.53 69.155c-16.66 10.01-29.916 28.068-38 47.406c-5.245 12.552-8.037 25.64-8.75 36.532l64.814 235.28c.293-.55.572-1.105.875-1.655c10.6-19.254 27.822-37.696 51.124-48.47L94.53 69.156zm74.876 287.563c-17.673 9.067-31.144 23.712-39.562 39c-4.464 8.105-7.262 16.36-8.688 23.75l11.688 42.405l1.625.125c-3.825-27.528 11.382-60.446 41.25-81.03l-6.314-24.25zm26.344 34.03c-32.552 17.26-46.49 52.402-41.844 72.906l289.844 24.53c-5.315-7.75-8.637-17.84-8.594-28.342l-22.562-9.063l46.625-7.31l-13.595-12.97c5.605-6.907 13.688-13.025 24.78-17.656L195.75 390.75z"/></svg>
                                        <span className="p-2">{manga.type}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <TagList listaTags={manga.genres}></TagList>
                            </div>
                            <div className='hidden lg:text-[16px] md:block'>
                                <p>{manga.synopsis ?? 'There\'s no synopsis about this manga.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='block lg:text-[16px] md:hidden px-4 sm:px-0'>
                    <div className="flex flex-col">
                        <strong className="mb-2">Synopsis</strong>
                        <p>{manga.synopsis ?? 'There\'s no synopsis about this manga.'}</p>
                    </div>
                </div>
            </div>
        </article>
        </>
    )
}
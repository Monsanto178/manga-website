import image from '../assets/images/1659478823502609.png';
import skeletonImg from '../assets/images/skeleton.jpg';
import snowImg from '../assets/images/snow.jpg';
import atelierImg from '../assets/images/atelier-hat.jpg';
import touhouImg from '../assets/images/tohou.jpg';
import robotAngelImg from '../assets/images/robot-angel.jpg';
import reedHoodImg from '../assets/images/redhood.jpg';
import blanco from '../assets/images/blanco.png';
import flclImg from '../assets/images/flcl.png';
import { ChapterTagList, MangaSideCard, Tag, TagList, StatsCardList, RelatedCard, AuthorCard } from '../Components';
import { CardList } from '../Components';
import { GenreCardList } from '../Components';
import { Banner, MangaBanner} from '../Components';

import { usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';
import { RelatedCardList } from '../Components/RelatedCard/RelatedCardList';

const listaTags = [
    {key:1, name:'Isekai'},
    {key:2, name:'Comedia'},
    {key:3, name:'Aventura'},
    {key:4, name:'Romance'},
    {key:5, name:'Drama'},
    {key:6, name:'Horror'},
    {key:7, name:'Terror'},
    {key:8, name:'Slice-of-Life'},
    {key:9, name:'Fantasía'},
]

const tagsHousekiNoKuni = [
    {key:1, name:'Fantasía'},
    {key:2, name:'Drama'},
    {key:3, name:'Acción'},
    {key:4, name:'Psicológico'},
    {key:5, name:'Misterio'},
    {key:6, name:'Filosófico'},
    {key:7, name:'Aventura'},
];
const tagsTouhouNightRealm = [
    {key:1, name:'Fantasía'},
    {key:2, name:'Acción'},
    {key:3, name:'Bullet Hell'},
    {key:4, name:'Comedia'},
    {key:5, name:'Aventura'},
    {key:6, name:'Misterio'},
    {key:7, name:'Sobrenatural'},
    {key:8, name:'Magia'},
];
const tagsCaperucitaRoja = [
    {key:1, name:'Fantasía'},
    {key:2, name:'Horror'},
    {key:3, name:'Acción'},
    {key:4, name:'Dark Fantasy'},
    {key:5, name:'Drama'},
    {key:6, name:'Suspenso'},
    {key:7, name:'Reinterpretación de cuentos'},
];

const mangaList = [
    {key:1, cover: skeletonImg, chapter:19, title:'The Last King'},
    {key:2, cover: snowImg, chapter:25, title:'El Eternauta'},
    {key:3, cover: atelierImg, chapter:46, title:'Witch Hat Atelier'},
    {key:4, cover: touhouImg, chapter:532, title:'Touhou: A Frog\'s Garden'},
    {key:5, cover: robotAngelImg, chapter:4, title:'Matrix: The Omnisaya'},
    {key:6, cover: reedHoodImg, chapter:75, title:'Caperucita Roja'},
    {key:7, cover: flclImg, chapter:12, title:'FLCL'},
]

const genreList = [
    {key:1, cover: skeletonImg, title:'Adventure'},
    {key:2, cover: snowImg, title:'Horror'},
    {key:3, cover: atelierImg, title:'Magic'},
    {key:4, cover: touhouImg, title:'Isekai'},
    {key:5, cover: robotAngelImg,title:'Sci-Fi'},
    {key:6, cover: reedHoodImg, title:'Historical'},
    {key:7, cover: flclImg, title:'Comedy'},
]

const popularTitles = [
    {id:1, title:'Houseki no kuni', cover: image, tags:tagsHousekiNoKuni, author:'Haruko Ichikawa', artist: 'Mamoru Ishikawa', description: 'En un mundo habitado por seres gemiformes inmortales, cada uno con habilidades únicas según su dureza y composición, las Gemas deben defenderse de los Lunarianos, misteriosos invasores que buscan capturarlas. Phosphophyllite, la gema más frágil y sin un rol definido, ansía encontrar un propósito. Sin embargo, su búsqueda de identidad la llevará por un camino de descubrimiento, sacrificio y transformación existencial.'},
    {id:2, title:'Touhou Night Realm', cover: touhouImg, tags:tagsTouhouNightRealm, author:'Zun', artist: 'Jorge', description: 'Basado en el universo de Touhou Project, este manga nos transporta a Gensokyo durante una noche en la que los límites entre los mundos comienzan a colapsar. Reimu Hakurei y otras figuras conocidas deberán enfrentarse a una nueva amenaza del Reino de la Noche, una dimensión alterna donde las reglas de la realidad cambian. Entre hechizos, misterios y combates danzantes, las protagonistas deben descubrir el origen de esta anomalía antes de que Gensokyo sea consumido por la oscuridad.'},
    {id:3, title:'Caperucita Roja', cover: reedHoodImg, tags:tagsCaperucitaRoja, author:'Grey Wolf', artist: 'Carlos', description: 'Una reinterpretación oscura del clásico cuento, este manga presenta a Caperucita como una joven cazadora entrenada para erradicar bestias que amenazan los bosques. Tras la muerte de su abuela, se adentra en lo profundo del bosque maldito, donde descubre que el “lobo” es solo una pieza de un conflicto ancestral entre humanos y criaturas sombrías. Con una capucha roja como símbolo de venganza y justicia, Caperucita lucha por revelar la verdad y cambiar su destino.'},
]

const altTitles = [
    {id:1, name:'Land of Lustrous', lang: 'english'},
    {id:2, name:'La Tierra de Gemas', lang: 'spanish'},
    {id:3, name:'Houseki  no Kuni', lang: 'japanese'},
    {id:4, name:'宝石の国', lang: 'japanese'},
]

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
    console.log(manga);
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
            <section className='relative text-white z-11 pb-[8rem] px-0 sm:px-[7.5rem]'>
                <section className='relative flex w-full py-[2rem] mt-[3rem] flex justify-center z-11 text-[18px] sm:text-[20px]'>
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
                    <div>
                        <h2>CHARACTERS</h2>
                    </div>
                }

                {statOpt === 'information' && 
                    <section className='my-0 gap-y-[2rem] flex justify-between flex-wrap'>
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
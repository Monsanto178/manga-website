import image from '../assets/images/1659478823502609.png';
import skeletonImg from '../assets/images/skeleton.jpg';
import snowImg from '../assets/images/snow.jpg';
import atelierImg from '../assets/images/atelier-hat.jpg';
import touhouImg from '../assets/images/tohou.jpg';
import robotAngelImg from '../assets/images/robot-angel.jpg';
import reedHoodImg from '../assets/images/redhood.jpg';
import gatito from '../assets/images/Gatito.png';
import blanco from '../assets/images/blanco.png';
import flclImg from '../assets/images/flcl.png';
import { BannerList, TagList } from '../Components';
import { CardList } from '../Components';
import { GenreCardList } from '../Components';
import { Banner } from '../Components';
import { useEffect, useState } from 'react';

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
    {mal_id:1, images:{webp:{image_url: skeletonImg, small_image_url:''}, jpg:{image_url:'', small_image_url:''}}, title:'The Last King', status: 'Finished'},
    {mal_id:2, images:{webp:{image_url: snowImg, small_image_url:''}, jpg:{image_url:'', small_image_url:''}}, title:'El Eternauta', status: 'Finished'},
    {mal_id:3, images:{webp:{image_url: atelierImg, small_image_url:''}, jpg:{image_url:'', small_image_url:''}}, title:'Witch Hat Atelier', status: 'Finished'},
    {mal_id:4, images:{webp:{image_url: touhouImg, small_image_url:''}, jpg:{image_url:'', small_image_url:''}}, title:'Touhou: A Frog\'s Garden', status: 'Finished'},
    {mal_id:5, images:{webp:{image_url: robotAngelImg, small_image_url:''}, jpg:{image_url:'', small_image_url:''}}, title:'Matrix: The Omnisaya', status: 'Finished'},
    {mal_id:6, images:{webp:{image_url: reedHoodImg, small_image_url:''}, jpg:{image_url:'', small_image_url:''}}, title:'Caperucita Roja', status: 'Finished'},
    {mal_id:7, images:{webp:{image_url: flclImg, small_image_url:''}, jpg:{image_url:'', small_image_url:''}}, title:'FLCL', status: 'Finished'},
    {mal_id:8, images:{webp:{image_url: touhouImg, small_image_url:''}, jpg:{image_url:'', small_image_url:''}}, title:'Touhou: A Frog\'s Garden', status: 'Finished'},
    {mal_id:9, images:{webp:{image_url: skeletonImg, small_image_url:''}, jpg:{image_url:'', small_image_url:''}}, title:'The Last King', status: 'Finished'},
    {mal_id:10, images:{webp:{image_url: atelierImg, small_image_url:''}, jpg:{image_url:'', small_image_url:''}}, title:'Witch Hat Atelier', status: 'Finished'},


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
    {id:1, title:'Houseki no kuni', cover: image, tags:tagsHousekiNoKuni, author:'Aruka Ichikawa',description: 'En un mundo habitado por seres gemiformes inmortales, cada uno con habilidades únicas según su dureza y composición, las Gemas deben defenderse de los Lunarianos, misteriosos invasores que buscan capturarlas. Phosphophyllite, la gema más frágil y sin un rol definido, ansía encontrar un propósito. Sin embargo, su búsqueda de identidad la llevará por un camino de descubrimiento, sacrificio y transformación existencial.'},
    {id:2, title:'Touhou Night Realm', cover: touhouImg, tags:tagsTouhouNightRealm, author:'Zun',description: 'Basado en el universo de Touhou Project, este manga nos transporta a Gensokyo durante una noche en la que los límites entre los mundos comienzan a colapsar. Reimu Hakurei y otras figuras conocidas deberán enfrentarse a una nueva amenaza del Reino de la Noche, una dimensión alterna donde las reglas de la realidad cambian. Entre hechizos, misterios y combates danzantes, las protagonistas deben descubrir el origen de esta anomalía antes de que Gensokyo sea consumido por la oscuridad.'},
    {id:3, title:'Caperucita Roja', cover: reedHoodImg, tags:tagsCaperucitaRoja, author:'Grey Wolf', description: 'Una reinterpretación oscura del clásico cuento, este manga presenta a Caperucita como una joven cazadora entrenada para erradicar bestias que amenazan los bosques. Tras la muerte de su abuela, se adentra en lo profundo del bosque maldito, donde descubre que el “lobo” es solo una pieza de un conflicto ancestral entre humanos y criaturas sombrías. Con una capucha roja como símbolo de venganza y justicia, Caperucita lucha por revelar la verdad y cambiar su destino.'},
]

interface Manga {
    mal_id:number;
    images:{
        jpg:{image_url:string, small_image_url:string},
        webp:{image_url:string, small_image_url:string}
    };
    status:string;
    publishing?:boolean;
    title:string;
}

const Home= (): React.JSX.Element  => {
    const [topMangas, setTopMangas] = useState<Manga[]>([]);
    const [populars, setPopulars] = useState<Manga[]>([]);
    const [recents, setRecents] = useState<Manga[]>([]);
    const [recommendations, setRecommentions] = useState<Manga[]>([]);

    const [loadingRec, setLoadingRec] = useState(true);
    const [loadingRecent, setLoadingRecent] = useState(true);
    const [loadingTop, setLoadingTop] = useState(true);
    const [loadingPop, setLoadingPop] = useState(true);

    const [errorRec, setErrorRec] = useState<string | null>(null);
    const [errorRecent, setErrorRecent] = useState<string | null>(null);
    const [errorTop, setErrorTop] = useState<string | null>(null);
    const [errorPop, setErrorPop] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async() => {
            //Top Mangas
            try {
                const res = await fetch('/mangas/tops/1');
                if (!res.ok) throw new Error("Error en TopMangas");
                const mangas = await res.json();
                setTopMangas(mangas.data)
            } catch (error) {
                setErrorTop('Error cargando top mangas.')
            } finally {
                setLoadingTop(false)
            }

            //Recents Mangas
            try {
                const res = await fetch('/mangas/recents/1');
                if (!res.ok) throw new Error("Error en RecentsMangas");
                const mangas = await res.json();
                console.log('RESULTADOS DE RECIENTES: ');
                console.log(mangas);
                
                
                setRecents(mangas.data)
            } catch (error) {
                setErrorRecent('Error cargando recents mangas.')
            } finally {
                setLoadingRecent(false)
            }

            //Recommendations
            try {
                const res = await fetch('/mangas/recommendations/1');
                if (!res.ok) throw new Error("Error en Recommendations");
                const mangas = await res.json();
                console.log('RESULTADOS DE RECOMENDACIONES: ');
                console.log(mangas);
                setRecommentions(mangas.data)
            } catch (error) {
                setErrorRec('Error cargando top mangas.')
            } finally {
                setLoadingRec(false)
            }

            //Populars Mangas
            try {
                const res = await fetch('/mangas/populars/1');
                if (!res.ok) throw new Error("Error en PopularsMangas");
                const mangas = await res.json();
                setPopulars(mangas.data)
            } catch (error) {
                setErrorPop('Error cargando populares.')
            } finally {
                setLoadingPop(false)
            }
        };

        fetchData();
    }, []);

    return (
        <>
        { <section className='overflow-hidden bg-[#FF6740] relative text-white'>
            <article className='w-full flex h-[240px] justify-center z-1'>
                <div className='absolute top-[15%] left-[5%] z-1'>
                    <h1 className='text-[32px] font-extrabold'>MangaTail</h1>
                    <div className='w-[1300px] bg-white h-[0.25rem]'></div>
                </div>
                <picture className='w-[365px] h-[100px] z-2'>
                    <img src={gatito} alt="Gatito" />
                </picture>
            </article>
        </section> }

        <section className="my-0 mx-[2rem] mangaContainer">
            <div className="text-white text-[26px] sm:text-[32px] mt-4 mx-4">
                <h2>Top  Mangas</h2>
            </div>
            {loadingTop && <p className='text-white text-center'>Cargando mangas...</p>}
            {errorTop && <p className='text-red text-center'>{errorTop}</p>}
            {!loadingTop && !errorTop && <CardList manga={topMangas} horizontalView={false}></CardList>}
            {/* <CardList manga={mangaList} horizontalView={false}></CardList> */}
        </section>

        <section className="my-0 mx-[2rem] mangaContainer">
            <div className="text-white text-[26px] sm:text-[32px] mt-4 mx-4">
                <h2>Populares</h2>
            </div>
            {loadingPop && <p className='text-white text-center'>Cargando mangas...</p>}
            {errorPop && <p className='text-red text-center'>{errorPop}</p>}
            {!loadingPop && !errorPop && <CardList manga={populars} horizontalView={true}></CardList>}
            {/* <CardList manga={mangaList} horizontalView={true}></CardList> */}
        </section>

        <section className="my-0 mx-[2rem] mangaContainer">
            <div className="text-white text-[26px] sm:text-[32px] mt-4 mx-4">
                <h2>Recomendaciones</h2>
            </div>
            {loadingRec && <p className='text-red text-center'>Cargando mangas...</p>}
            {errorRec && <p className='text-red text-center'>{errorRec}</p>}
            {!loadingRec && !errorRec && <CardList manga={recommendations} horizontalView={true} />}
            {/* <CardList manga={mangaList} horizontalView={true}></CardList> */}
        </section>

        <section className="my-0 mx-[2rem] mangaContainer">
            <div className="text-white text-[26px] sm:text-[32px] mt-4 mx-4">
                <h2>Recientes</h2>
            </div>
            {loadingRecent && <p className='text-white text-center'>Cargando mangas...</p>}
            {errorRecent && <p className='text-red text-center'>{errorRecent}</p>}
            {!loadingRecent && !errorRecent && <CardList manga={recents} horizontalView={true}></CardList>}
            {/* <CardList manga={mangaList} horizontalView={true}></CardList> */}
        </section>

        <section className="my-0 mx-[2rem] mangaContainer">
            <GenreCardList cards={genreList}></GenreCardList>
        </section>
        </>
    )
};

export default Home;
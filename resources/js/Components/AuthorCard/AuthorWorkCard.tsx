type Media = {
    mal_id:number;
    images:{
        jpg:{image_url:string};
        webp:{image_url:string};
    };
    title:string;
}

type Manga = {
    position:string;
    manga:Media;
}

type Anime = {
    position:string;
    anime:Media;
}

type Prop  = {
    data: Manga | Anime;
    type: 'manga' | 'anime';
}

export const AuthorWorkCard = ({data, type='manga'}:Prop) => {
    const media = type === 'manga' ? (data as Manga).manga : (data as Anime).anime;
    return (
        <>
            <a href={`/mangas/manga/${media.mal_id}`} className="flex text-white w-[28%] sm:w-[31%] min-w-[200px] sm:min-w-[300px] max-w-[500px] max-h-[160px] bg-[#363636] overflow-hidden rounded-[15px] transition-transform duration-300 hover:scale-110 overflow-hidden cursor-pointer">
                <picture className="aspect-[6/10]">
                    <img src={media.images.webp.image_url} alt="media_cover" className="w-full h-full"/>
                </picture>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col justify-between h-full p-3 text-[12px] sm:text-[14px]">
                        <div>
                            <strong className="overflow-hidden text-elipsis"                               
                                    style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    }}>
                                {media.title}
                            </strong>
                        </div>
                        <div className="flex w-fit min-w-20 flex items-center">
                            {/* <span>{type}</span> */}
                            <span>{data.position.replace('add ', '')}</span>
                        </div>
                    </div>

                    {/* <div>
                        <span>{data.position}</span>
                    </div> */}
                </div>
            </a>
        </>
    )
}
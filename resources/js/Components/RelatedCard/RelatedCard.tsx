type Media = {
    mal_id:number;
    type:string;
    title?:string;
}

type Relate = Media & {
    type:string;
    status:string;
    images:{
        jpg:{
            image_url:string;
            small_image_url:string;
            large_image_url:string;
        }
        webp:{
            image_url:string;
            small_image_url:string;
            large_image_url:string;
        }
    }
}

type Relation = {
    relation:string;
    entry:Relate;
}



export const RelatedCard = ({entry, relation}:Relation) => {
    const relacion = relation;
    const uri = entry.type === 'manga' ? `/mangas/manga/${entry.mal_id}` : `/`;
    return (
        <>
        <style>
        {`
        @media (max-width: 887px) {
             .relateCard {
            min-width: 350px !important;
            }
        }
        @media (max-width: 500px) {
             .relateCard {
            min-width: 300px !important;
            }
        }
        `}
        </style>
            <a href={uri} className="relateCard flex text-white w-[31%] min-w-[300px] max-w-[500px] max-h-[160px] bg-[#363636] overflow-hidden rounded-[15px] transition-transform duration-300 hover:scale-110 overflow-hidden cursor-pointer">
                <picture className="w-[30%] min-w-[105px] sm:min-w-[119px] max-h-[160px]">
                    <img className="w-full h-full object-cover object-center" src={entry.images.webp.image_url} alt="img" />
                </picture>
                <div className="flex flex-col justify-between p-4 w-[69%]">
                    <div className="flex flex-col">
                        <div className="p-1 bg-[#3C91E6] max-w-fit min-w-[5rem] flex justify-center rounded-[15px]">
                            <span>{relacion}</span>
                        </div>
                        <div className="w-full">
                            <strong 
                            className="block w-full overflow-hidden text-ellipsis"
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    }}
                            >{entry.title}</strong>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span>{entry.type}</span>
                        <span>{entry.status}</span>
                    </div>
                </div>
            </a>
        </>
    )
}
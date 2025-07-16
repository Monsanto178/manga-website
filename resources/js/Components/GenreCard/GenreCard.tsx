interface Props {
    title:string;
    cover:string;
    url?:string;
}

export const GenreCard = ({title, cover, url} : Props) => {
    return (
        <>
        <a href="" className="p-4 w-64 h-32 inline-block">
            <div className="flex flex-col">
                <picture className="overflow-hidden rounded-md">
                    <img src={cover} alt="genre_cover" className="w-full h-full aspect-[9/12]"/>
                </picture>
            </div>
            <div>
                <span>{title}</span>
            </div>
        </a>
        </>
    )
}
import { useEffect, useState } from "react";
import { LoadingCard } from "./LoadingCard";

type Author = {
    mal_id: number;
    name:string;
}

type AuthorProps = {
    entries: Author[];
    manga_id:number;
}

type AuthorFull = Author & {
    image_url:string;
    position:string;
}

export const AuthorCard = ({entries, manga_id}:AuthorProps) => {
    const [authors, setAuthors] = useState<AuthorFull[]>([]);
    const [isLoading, setLoading] = useState(true);

    const ids = entries.map((person) => person.mal_id);

    const getCsrfToken = async () => {
        const response = await fetch('/csrf-token');
        const data = await response.json();
        return data.csrf_token;
    };
    

    const fetchData = async() => {
        try {
            const csrfTokeni = await getCsrfToken();

            const res = await fetch('/mangas/manga/getAuthors' , {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRF-TOKEN': csrfTokeni,
                },
                body: JSON.stringify({
                    authors_ids: ids,
                    manga_id: manga_id
                })
            })

            if (!res.ok) {
                console.log('error al intentar enviar');
            }
            const response = await res.json();
            setAuthors(response);
            setLoading(false);
            console.log(response)
            
        } catch (error) {
            console.error('error horrible: ' + error)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);
    return (
        <>
        {isLoading && 
        <article className="grid justify-center" style={{gridTemplateColumns:'repeat(auto-fill, 400px)', rowGap:'3rem', columnGap:'1.5rem'}}>
            {
            ids.map((el) => {
                return(
                    <LoadingCard key={el}/>
                )
            })
            }
        </article>
        }
        {!isLoading &&
        <article className="grid justify-center" style={{gridTemplateColumns:'repeat(auto-fill, 400px)', rowGap:'3rem', columnGap:'3rem'}}>
        {
        authors.map((author) => {
            let rol = '';
            switch (author.position) {
                case 'Story & Art':
                    rol = 'Author';
                    break;
                case 'Story':
                    rol = 'Author';
                    break;
                case 'Art':
                    rol = 'Artist'
                    break;
                default:
                    break;
            }
            return (
                <>
                <a href='/' className="relateCard flex text-white w-[31%] min-w-[400px] max-w-[500px] h-[160px] bg-[#363636] overflow-hidden rounded-[15px] transition-transform duration-300 hover:scale-110 overflow-hidden cursor-pointer">
                    <picture className="w-[30%] min-w-[105px] sm:min-w-[119px] max-h-[160px]">
                        <img className="w-full h-full object-cover object-center" src={author?.image_url} alt="img" />
                    </picture>
                    <div className="flex flex-col justify-between p-4 w-[69%]">
                        <div className="flex flex-col">
                            <div className="p-1 bg-[#3C91E6] max-w-fit min-w-[5rem] flex justify-center rounded-[15px]">
                                <span>{rol}</span>
                            </div>
                            <div className="w-full">
                                <strong 
                                className="block w-full overflow-hidden text-ellipsis"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        }}
                                >{author?.name}</strong>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span>{author?.position}</span>
                        </div>
                    </div>
                </a>
                </>
            )
        })}
        </article>
        }
        </>
    )
}
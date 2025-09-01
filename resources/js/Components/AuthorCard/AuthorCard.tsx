import { useEffect, useRef, useState } from "react";
import { LoadingCard } from "./LoadingCard";

type Author = {
    mal_id: number;
    name:string;
    image_url?:string;
    position?:string;
}

type AuthorProps = {
    entries: Author[];
    setLoading: boolean;
}

export const AuthorCard = ({entries, setLoading= false}:AuthorProps) => {
    const authorsRef = useRef<HTMLElement>(null);

    const scrollTo = () => {
        if (authorsRef.current) {
            const y = authorsRef.current.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: y - 150,
                behavior: 'smooth',
            });
        }
    }

    useEffect(() => {
        setTimeout(() => {
            scrollTo();
        }, 100);
    }, []);
    return (
        <>
        {setLoading && 
        <article ref={authorsRef} className="grid" style={{gridTemplateColumns:'repeat(auto-fill, 400px)', rowGap:'3rem', columnGap:'1.5rem'}}>
            {
            entries.map((_, idx) => {
                return(
                    <LoadingCard key={idx}/>
                )
            })
            }
        </article>
        }
        {!setLoading &&
        <article ref={authorsRef} className="grid" style={{gridTemplateColumns:'repeat(auto-fill, 400px)', rowGap:'3rem', columnGap:'3rem'}}>
        {
        entries.map((author) => {
            console.log(author);
            
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
                <a href={`/author/${author.mal_id}`} className="relateCard flex text-white w-[31%] min-w-[400px] max-w-[500px] h-[160px] bg-[#363636] overflow-hidden rounded-[15px] transition-transform duration-300 hover:scale-110 overflow-hidden cursor-pointer">
                    <picture className="w-[30%] min-w-[105px] sm:min-w-[119px] max-h-[160px]">
                        <img className="w-full h-full object-cover object-center" src={author.image_url} alt="img" />
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
                            <span>{author.position}</span>
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
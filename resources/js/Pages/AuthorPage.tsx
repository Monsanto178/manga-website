import { useEffect, useState } from "react";
import { AuthorFullCard, AuthorWorkCard, LoadingFullCard} from "@/Components";
import { FullAuthorType } from "@/Types";

interface Props {
    mal_id: string;
}


const AuthorPage = ({mal_id}:Props) => {
    const [author, setAuthor] = useState<FullAuthorType | null>(null);
    const [authorLoading, setAuthorLoading] = useState(true);
    const [currentSelect, setCurrentSelect] = useState('Manga');

    const getCsrfToken = async () => {
        const response = await fetch('/csrf-token');
        const data = await response.json();
        return data.csrf_token;
    };

    const fetchData = async (endpoint:string, body:string) =>  {
        const csrf_token = await getCsrfToken();
        try {
            const petition = await fetch(endpoint, 
              {  method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                },
                body: body
            });
            
            if (!petition.ok) throw new Error("An error has occurred.");

            const response = await petition.json();
            return response;
        } catch (error) {
            console.error('The error is: ' + error)
        }
    }

    async function runFetchAuthor() {
        const endpoint = '/author/getFullAuthor';
        const body = JSON.stringify({authorId:mal_id});

        const data = await fetchData(endpoint, body);

        setAuthor(data);
        setAuthorLoading(false);
    }

    type Selection = 'Manga' | 'Anime';
    const changeSelect = (selection:Selection) => {
        if(selection === currentSelect) return;
        setCurrentSelect(selection)
    }

    useEffect(() => {
        if (!author) {
            runFetchAuthor();
        }
    }, [])

    return (
        <>
        <style>
        {`
        @media (max-width: 639px) {
            .gridCard {
                grid-template-columns: repeat(auto-fill, 200px) !important;
            }
        }
        `}
        </style>
        <div className="flex flex-col w-full flex flex-col px-2 md:px-[4.2rem] sm:px-6 pt-30 gap-y-2">
            <section className="flex flex-col sm:flex-row gap-4">
                {author && 
                    <AuthorFullCard author={author}/>                
                }
                {!author && authorLoading &&
                    <LoadingFullCard />
                }
            </section>

            <section className="flex justify-evenly text-[18px] mb-4 mt-8 sm:mb-8 sm:mt-12 md:text-[22px] sm:text-[20px]">
                {author && !authorLoading &&
                    <>
                        <button onClick={() => changeSelect('Manga')} className={`p-2 transition-all duration-300 ease-in-out ${currentSelect === 'Manga' ? 'bg-[#3C91E6] font-bold' : 'hover:bg-[#3C91E6] hover:font-bold'} w-full cursor-pointer`}>Manga Works</button>
                        <button onClick={() => changeSelect('Anime')} className={`p-2 transition-all duration-300 ease-in-out ${currentSelect === 'Anime' ? 'bg-[#3C91E6] font-bold' : 'hover:bg-[#3C91E6] hover:font-bold'} w-full cursor-pointer`}>Anime Works</button>
                    </>
                }
                {!author && authorLoading &&
                    <article className='p-8 flex justify-center align-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                    </article>
                }
            </section>

            <section className="mb-12">
                <article className="grid justify-center gridCard" style={{gridTemplateColumns:'repeat(auto-fill, 300px)', rowGap:'3rem', columnGap:'1.5rem'}}>
                    {author && currentSelect === 'Manga' && 
                        ((author.manga && author?.manga.length>0) 
                        ?
                          author.manga.map((el, idx) => {
                            return (
                                <AuthorWorkCard key={idx} data={el} type="manga"/>
                            )
                        })
                        :  
                        <div className="bg-[#363636] flex justify-center items-center">
                            <span>The author has no registered manga works.</span>
                        </div>
                        )
                    }
                    {author && currentSelect === 'Anime' &&
                        ((author.anime && author?.anime.length > 0) 
                        ?
                          author.anime.map((el, idx) => {
                            return (
                                <AuthorWorkCard key={idx} data={el} type="anime"/>
                            )
                        })
                        :  
                        <div className="bg-[#363636] flex justify-center items-center">
                            <span>The author has no registered anime works.</span>
                        </div>
                        )
                    }
                </article>
            </section>
        </div>
        </>
    )
}

export default AuthorPage;
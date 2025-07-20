import { useEffect, useState } from "react"
import { CharacterCard } from "./CharacterCard";
import { PaginationCard } from "./PaginationCard";
type Character = {
    character:{
        mal_id:number;
        images:{
            jpg:{
                image_url:string;
            },
            webp:{
                image_url:string;
                small_image_url?:string;
            }
        };
        name:string,
    };
    role:string;

}

type CardProps = {
    mal_id:number;
    limitPerPage:number;
}

export const CharacterList = ({mal_id, limitPerPage} : CardProps) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [charPerPage, setCharPerPage] = useState<Character[]>([]);
    
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(limitPerPage-1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalChar, setTotalChar] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setLoading] = useState(true);

    const nextPage = () => {
        if(currentPage+1 > totalPages) return;

        if((end + limitPerPage) > totalChar) {
            setStart(end + 1);
            setEnd((end + (totalChar - end)) + 1);
            setCurrentPage(currentPage+1)

            return;
        };

        setStart(end + 1);
        setEnd(end + limitPerPage);
        setCurrentPage(currentPage+1)

    }

    const goToPage = (page:number) => {
        if(page === currentPage) return; 
        if (page === totalPages) {
            const newStart = (page - 1) * limitPerPage;
            const newEnd = totalChar - 1;
            setStart(newStart);
            setEnd(newEnd);
            setCurrentPage(page);
        } else if (page === 1) {
            setStart(0);
            setEnd(limitPerPage - 1);
            setCurrentPage(page);
        } else {
            const newStart = (page - 1) * limitPerPage;
            const newEnd = newStart + limitPerPage - 1;
            setStart(newStart);
            setEnd(newEnd);
            setCurrentPage(page);
        }

    }

    const previousPage = () => {
        if(currentPage-1 < 1) return;

        setEnd(start - 1);
        setStart(start - limitPerPage);
        setCurrentPage(currentPage-1)

    }

    const actions = {
        next: nextPage,
        goTo: goToPage,
        previous: previousPage
    }

    const sliceCharacters = (charList: Character[]) => {
        const limitedChars = charList.slice(start, end+1);
        setCharPerPage(limitedChars);
    }

    const fetchData = async () => {
        const res = await fetch(`/mangas/manga/${mal_id}/characters`);
        if (!res.ok) {
            console.error('An error has occurred.')
        }
        const response = await res.json();
        setCharacters(response.data);
        console.log(response.data);
        
        sliceCharacters(response.data);

        const aproxPages = (response.data.length) / limitPerPage;
        setTotalPages(Math.ceil(aproxPages))
        setTotalChar(response.data.length)

        setLoading(false);
    }

    useEffect(() => {
        sliceCharacters(characters);
    }, [start, end, characters]);
    useEffect(()=> {
        fetchData();
    }, []);
    return (
        <>
        {isLoading && 
            <div className="text-white">
                <h1>CARGANDO</h1>
            </div>
        }
        {!isLoading &&
        <>
        <style>
        {`
          @media (max-width: 639px) {
            .gridCard {
                grid-template-columns: repeat(auto-fill, 25%) !important;
            }
          }
        `}
      </style>
        <article className="gridCard grid justify-center items-center" style={{gridTemplateColumns:'repeat(auto-fill, 300px)', rowGap:'3rem', columnGap:'1.5rem'}}>
            {
            charPerPage.map((char) => {
                return (
                    <CharacterCard key={char.character.mal_id} character={char.character} role={char.role}/>
                )
            })  
            }
        </article>
        <article className="flex justify-center my-8">
            {
                <PaginationCard totalPages={totalPages} currentPage={currentPage} actions={actions}/>
            }
        </article>
        </>
        }
        </>
    )
}
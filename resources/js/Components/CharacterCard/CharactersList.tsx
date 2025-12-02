import { useEffect, useRef, useState } from "react"
import { CharacterCard } from "./CharacterCard";
import { PaginationCard } from "./PaginationCard";
import { CharacterType } from "../../Types";

type CardProps = {
    limitPerPage:number;
    charList: CharacterType[];
}

export const CharacterList = ({charList, limitPerPage} : CardProps) => {
    const [charPerPage, setCharPerPage] = useState<CharacterType[]>([]);
    
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(limitPerPage-1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalChar, setTotalChar] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const charactersRef = useRef<HTMLElement>(null);

    const scrollTo = () => {
        if (charactersRef.current) {
            const y = charactersRef.current.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: y - 150,
                behavior: 'smooth',
            });
        }
    }

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

    const sliceCharacters = (charList: CharacterType[]) => {
        const limitedChars = charList.slice(start, end+1);
        setCharPerPage(limitedChars);
    }


    useEffect(() => {
        sliceCharacters(charList);
        scrollTo();
    }, [start, end]);
    useEffect(() => {
        const aproxPages = (charList.length) / limitPerPage;
        setTotalPages(Math.ceil(aproxPages))
        setTotalChar(charList.length)
        setTimeout(() => {
            scrollTo();
        }, 100);
    }, [charList, limitPerPage])
    return (
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
        <article ref={charactersRef} className="gridCard grid justify-center items-center" style={{gridTemplateColumns:'repeat(auto-fill, 300px)', rowGap:'3rem', columnGap:'1.5rem'}}>
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
    )
}
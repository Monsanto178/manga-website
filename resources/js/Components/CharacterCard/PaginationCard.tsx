type Actions = {
    next: () => void;
    previous: () => void;
    goTo: (page:number) => void;
}

type Props = {
    totalPages:number;
    currentPage:number;
    actions: Actions;
}

export const PaginationCard = ({currentPage, totalPages, actions}:Props) => {
    const toMap = [];
    for (let i = 1; i < totalPages+1; i++) {
        toMap.push(i)
    }
    return (
        <>
            <div>
                {currentPage > 1 ? (
                    <button onClick={actions.previous} className="cursor-pointer p-2 hover:bg-[#3C91E6] hover:font-bold">Previous</button>
                ):(
                    <button disabled className="p-2 hover:bg-[#808080]">Previous</button>
                )}
                {toMap.map((el) => {
                    return (
                        <button key={el} onClick={() => actions.goTo(el)} className={`cursor-pointer p-2 ${el === currentPage ? 'bg-[#3C91E6] font-bold' : 'hover:bg-[#3C91E6] hover:font-bold'}`}>{el}</button>
                    )
                })}
                {currentPage < totalPages ? (
                    <button onClick={actions.next} className="cursor-pointer p-2 hover:bg-[#3C91E6] hover:font-bold">Next</button>
                ): (
                    <button disabled className="p-2 hover:bg-[#808080]">Next</button>
                )}
            </div>
        </>
    )
}
import { useState } from "react";

type Props = {
    pagination: {
        last_visible_page:number;
        current_page:number;
        has_next_page:boolean;
    }
    actions: {
        changePage: (page:string) => void;
    }
}

export const CategoryPagination = ({pagination, actions}:Props) => {
    const toMap = [];

    const runActions = (page:string) => {
        actions.changePage(page);
    }

    const start = pagination.current_page<5 ? 1 : pagination.current_page-2;
    for (let i = start; i < start+5; i++) {
        if (i <= pagination.last_visible_page) {
            toMap.push(i)
        }
    }
        
    return (
        <>
            <div>
                {!toMap.includes(1) && 
                <>
                    <button onClick={() => actions.changePage('1')} className="cursor-pointer p-2 hover:bg-[#3C91E6] hover:font-bold">1</button>
                    <button className="cursor-pointer p-2 hover:bg-[#3C91E6] hover:font-bold">...</button>
                </>
                }
                {toMap.map((el) => {
                    return (
                        <button key={el} onClick={el.toString() !== pagination.current_page.toString() ? () => runActions(el.toString()) : () => {}} 
                        className={`cursor-pointer p-2 ${el.toString() === pagination.current_page.toString() ? 'bg-[#3C91E6] font-bold' : 'hover:bg-[#3C91E6] hover:font-bold'}`}>
                            {el}
                        </button>
                    )
                })}
                {!(pagination.current_page+2 >= pagination.last_visible_page) && pagination.last_visible_page > 5 &&
                <>
                    <button className="cursor-pointer p-2 hover:bg-[#3C91E6] hover:font-bold">...</button>
                    <button onClick={() => actions.changePage(pagination.last_visible_page.toString())} className="p-2 hover:bg-[#808080]">{pagination.last_visible_page}</button>
                </>
                }   
            </div>
        </>
    )
}
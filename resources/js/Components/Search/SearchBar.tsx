interface Prop {
  searchVal: string;
  smallPort?: boolean;
  visibleBar?: boolean;
  setSearchVal: (value: string) => void;
  onSearch: (query: string) => void;
  onFocus?: () => void;
  toggleVisible?: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const SearchBar = ({smallPort, visibleBar, toggleVisible, onKeyDown, onSearch, searchVal, setSearchVal, onFocus}:Prop) => {
    return (
        <>
        {!smallPort &&
        <div className={`${(smallPort && visibleBar) ? 'hidden' : 'block'} w-80 h-10 transition-all duration-300 ease-in-out rounded-[10px] bg-white p-2 flex gap-x-2`}>
            <textarea
                value={searchVal}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onChange={(e) => setSearchVal(e.target.value)} name="" id="" placeholder='Search...' className='resize-none h-full w-[88%] appearance-none border-none bg-transparent px-2 overflow-hidden focus:outline-none'></textarea>
            <button onClick={() => onSearch(searchVal)} className='w-[10%] cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
            </button>
        </div>
        }
        {smallPort &&
        <>
            {visibleBar &&
            <div className={`w-80 h-10 transition-all duration-300 ease-in-out rounded-[10px] bg-white p-2 flex gap-x-2`}>
                <textarea
                    value={searchVal}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    onChange={(e) => setSearchVal(e.target.value)} name="" id="" placeholder='Search...' className='resize-none h-full w-[88%] appearance-none border-none bg-transparent px-2 overflow-hidden focus:outline-none'></textarea>
                <button onClick={() => onSearch(searchVal)} className='w-[10%] cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
                </button>
            </div>
            }
            <button onClick={toggleVisible} className='w-[10%] text-white cursor-pointer justify-items-center'>
                {visibleBar 
                ? <svg className="text-red-500" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12z"/></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg> 
                }
            </button>
        </>
        }
        </>
    )
}
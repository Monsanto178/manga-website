type Prop = {
    has_next_page?:boolean;
    actual_page:number;
    changePage?: (page:number) => void;
}

export const Pagination = ({has_next_page, actual_page, changePage= () => {}}:Prop) => {
    return (
        <>
            <div className={`flex ${actual_page !== 1 && has_next_page ? 'justify-between' : actual_page === 1 && has_next_page ? 'justify-end' : actual_page !== 1 && !has_next_page ? 'justify-start' : ''} items-center`}>
                {/* Left */}
                {actual_page !== 1 &&
                    <button onClick={() => changePage(actual_page-1)} className="rounded-[50%] flex items-center justify-center cursor-pointer w-20 h-20 transition-all duration-300 ease-in-out hover:bg-[#363636d6]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 1024 1024"><path fill="currentColor" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0"/></svg>
                    </button>
                }
                {/* Right */}
                {has_next_page &&
                    <button onClick={() => changePage(actual_page+1)} className="rounded-[50%] flex items-center justify-center cursor-pointer w-20 h-20 transition-all duration-300 ease-in-out hover:bg-[#363636d6]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 1024 1024"><path fill="currentColor" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0"/></svg>
                    </button>
                }
            </div>
        </>
    )
}
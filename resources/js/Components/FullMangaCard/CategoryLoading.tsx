import Skeleton from "react-loading-skeleton";

export const CategoryLoading = () => {
    const toMap = [];
    for (let i = 1; i < 11; i++) {
        toMap.push(i);
    }
    return (
    <>
        <style>
        {`
          @media (max-width: 639px) {
            .gridCard {
                grid-template-columns: repeat(auto-fill, 100%) !important;
            }
          }
        `}
        </style>
        <article className="gridCard grid justify-center items-center p-2" style={{gridTemplateColumns:'repeat(auto-fill, 45%)', rowGap:'3rem', columnGap:'1.5rem'}}>
           {toMap.map((idx) => {
                return (
                    <div key={idx} className="flex flex-row h-[40vh] overflow-y-hidden gap-x-4 bg-[#363636] p-4 rounded-[10px]">
                        <div className="w-[33%]">
                            <Skeleton width='100%' height='90%'/>
                        </div>
                        <div className="flex flex-col w-full gap-y-8 overflow-hidden">
                            <div className="w-full flex flex-col gap-y-4">
                                <Skeleton width='50%' height='1.5rem'/>
                                <Skeleton width='90%'/>
                            </div>
                            
                            <div className="flex flex-col w-full">
                                <Skeleton width='100%' />
                                <Skeleton width='100%' />
                                <Skeleton width='100%' />
                                <Skeleton width='100%' />
                                <Skeleton width='100%' />
                                <Skeleton width='100%' />
                            </div>
                        </div>
                    </div>
                )
           })}
        </article>
    </>
    )
}
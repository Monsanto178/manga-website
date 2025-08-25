import Skeleton from "react-loading-skeleton"

export const LoadingReviewCard = () => {
    return (
        <>
        <div className="flex gap-4 p-4 w-full md:w-[48%] max-h-[20rem] overflow-hidden">
            <div className="w-[30%]">
                <Skeleton width={'100%'} height={'100%'} className="aspect-[6/8]"/>
            </div>

            <div className="flex flex-col gap-4 w-[70%]">
                <div className="flex justify-between items-center">
                    <Skeleton width={'6rem'} height={'2.5rem'}/>
                    <Skeleton width={'5rem'} height={'1.5rem'}/>
                </div>
                <div>
                    <Skeleton count={9} width={'100%'} height={'1rem'}/>
                </div>
            </div>
        </div>
        </>
    )
}
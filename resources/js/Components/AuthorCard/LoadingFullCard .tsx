import Skeleton from "react-loading-skeleton"

export const LoadingFullCard = () => {
    return (
        <>
        <div className="flex flex-col sm:flex-row text-white w-full gap-4">
            <article className="flex flex-col w-full sm:w-[20%] min-w-46 p-2 gap-y-2 bg-[#363636]">
                <picture className="w--full">
                    <Skeleton width="100%" height="15rem"/>
                </picture>
                <div className="flex flex-col gap-y-2">
                    <Skeleton width='100%' height='1.25rem'/>
                    <Skeleton width='100%' height='0.8rem'/>
                    <Skeleton width='100%' height='0.8rem'/>
                    <Skeleton width='100%' height='0.8rem'/>
                    <Skeleton width='100%' height='0.8rem'/>
                </div>
            </article>

            <article className="w-full sm:w-[80%] p-2 bg-[#363636]">
                <div className="flex flex-col gap-y-4">
                    <Skeleton width="100%" height="0.8rem"/>
                    <Skeleton width="100%" height="0.8rem"/>
                    <Skeleton width="100%" height="0.8rem"/>
                    <Skeleton width="100%" height="0.8rem"/>
                    <Skeleton width="100%" height="0.8rem"/>
                    <Skeleton width="100%" height="0.8rem"/>
                    <Skeleton width="100%" height="0.8rem"/>
                    <Skeleton width="100%" height="0.8rem"/>
                </div>
            </article>
        </div>
        </>
    )
}
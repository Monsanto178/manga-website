import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export const LoadingCard = () => {
    return (
        <>
            <div className="flex text-white w-[31%] min-w-[300px] max-w-[500px] max-h-[160px] bg-[#363636] overflow-hidden rounded-[15px]">
                    <picture className="w-[30%] min-w-[105px] sm:min-w-[119px] max-h-[160px]">
                        <Skeleton width="100%" height="100%"/>
                    </picture>

                <div className="flex flex-col justify-between p-4 max-w[69%]">
                    <div className="flex flex-col">
                        <div>
                            <Skeleton width="5rem" height="2rem" className="rounded-[15px]"/>
                        </div>
                        <div>
                            <Skeleton width="12rem"/>
                        </div>
                    </div>
                    <div>
                        <Skeleton width="4rem"/>
                    </div>
                </div>
            </div>
        </>
    )
}
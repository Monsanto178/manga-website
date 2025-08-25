import Skeleton from "react-loading-skeleton"

export const LoadingBanner = () => {
    return (
        <>
        <div className="flex flex-col text-white py-0 sm:py-[2rem] p-0 sm:p-[1.5rem] relative z-10 gap-y-[3rem] w-full">
            <div className="flex justify-start gap-x-[1.5rem] w-full">
                {/* Imagen Skeleton */}
                <picture className="group flex items-start relative mb-auto select-none min-w-[160px] w-full h-[100%] max-w-[50%] max-h-[350px] md:!max-w-[210px] sm:!max-height-[320px] sm:!max-width-[180px] aspect-[6/12] object-top object-cover bg-transparent rounded-md overflow-hidden">
                    <Skeleton height="50vh" width="50vw"/>
                </picture>

                {/* Contenedor de Texto Skeleton */}
                <div className="w-full max-w-[70%] md:!max-w-full">
                    <div className="flex flex-col justify-between w-[100%] h-full gap-y-[1.5rem]">
                        <div>
                            <div className="text-[26px] lg:text-[30px]">
                                <Skeleton width={200} height={30} />
                            </div>
                            <div className="flex flex-col items-start sm:flex-row sm:items-center text-[14px] sm:text-[16px] gap-x-4">
                                <div className="flex items-center">
                                    <Skeleton circle width={20} height={20} />
                                    <Skeleton width={60} height={20} className="ml-2" />
                                </div>
                                <div className="flex items-center">
                                    <Skeleton circle width={20} height={20} />
                                    <Skeleton width={60} height={20} className="ml-2" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row flex-wrap gap-4">
                            <Skeleton width={100} height={30} />
                            <Skeleton width={100} height={30} />
                            <Skeleton width={100} height={30} />
                        </div>
                        <div className="hidden lg:text-[16px] md:block">
                            <Skeleton count={7} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="block lg:text-[16px] md:hidden px-4 sm:px-0">
                <div className="flex flex-col">
                    <strong className="mb-2">
                        <Skeleton width={100} height={20} />
                    </strong>
                    <Skeleton count={6} />
                </div>
            </div>
        </div>
        </>
    )
}
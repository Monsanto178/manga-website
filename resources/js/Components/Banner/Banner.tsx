import { TagList } from "../Tag/TagList";
import { CardType } from "@/Types";

interface Props {
    card: CardType
}


export const Banner = ({card} : Props) => {
    return (
        <>
        <article className='relative bg-cover bg-center w-full h-full flex-shrink-0 flex-grow-0 py-[1rem] px-[2rem]' style={{backgroundImage:`url(${card.cover})` }}>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/100'></div>
            <div className='absolute inset-0 bg-black/30' style={{filter:'blur(120px)'}}></div>
            <div className="flex flex-col  text-white p-[2rem]] gap-y-[1.5rem] sm:p-[1.5rem] relative z-10">
                <div className='text-[26px] sm:text-[32px]'>
                    <h2>Títulos Populares</h2>
                </div>
                <div className='flex h-[22vh] gap-x-[1.5rem] md:!h-[40vh]'>
                    <picture className='group flex items-start relative mb-auto select-none min-w-[160px] w-full h-full !h-[10rem] 
                                        md:!h-full aspect-[7/10] !w-auto object-top object-cover bg-transparent rounded-md overflow-hidden'>
                        <img src={card.cover} alt="banner_img" className='h-full w-full'/>
                    </picture>
                    <div className='flex flex-col justify-between mt-auto grid gap-6 sm:gap-2 h-full max-w-[80%]' style={{minHeight:'0px', gridTemplateRows:'1fr auto'}}>
                        <div className='flex flex-col gap-y-[1.5rem]'>
                            <div>
                                <div className='text-[26px] lg:text-[30px]'>
                                    <h3>{card.title}</h3>
                                </div>
                                <div className='hidden sm:block'>
                                    <TagList listaTags={card.tags}></TagList>
                                </div>
                            </div>
                            <div className='hidden lg:text-[16px] md:block'>
                                <p>{card.description}</p>
                            </div>
                        </div>
                        <div className='text-[16px] md:text-[24px]'>
                            <h2>{card.author}</h2>
                        </div>
                    </div>
                </div>
                <div className='block sm:hidden'>
                    <TagList listaTags={card.tags}></TagList>
                </div>
            </div>
        </article>
        </>
    )
}
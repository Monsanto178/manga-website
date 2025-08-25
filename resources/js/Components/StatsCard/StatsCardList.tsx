import { TagList } from "../Tag/TagList";
import { StatsCard } from "./StatsCard";

type Prop = {
    titles: Array<{type:string, title:string}>;
    themes: Array<{mal_id:number, type:string, name:string}>;
    demographics: Array<{mal_id:number, type:string, name:string}>;
    serializations: Array<{mal_id:number, type:string, name:string}>;
    external: Array<{name:string, url:string}>;
    chapters: number | null;
    volumes: number | null;
    score: number | null;
    favorites: number | null;
    rank: number | null;
    published: string;
}

type Props = {
    props: Prop;
}

export const StatsCardList = ({props}:Props) => {
    return (
        <>
            <article className='min-w-[345px] w-full'>
                <div className='text-[18px] mb-4 mx-4 sm:mx-0'>
                    <h2>Titles</h2>
                </div>
                <div className='flex flex-wrap  justify-between gap-x-[10%] gap-y-4 p-4 bg-[#2D2D2D]'>
                    {<StatsCard  type="title" values={props.titles}/>}
                </div>
            </article>

            <article className='min-w-[345px] w-full'>
                <div className='text-[18px] mb-4 mx-4 sm:mx-0'>
                    <h2>Information</h2>
                </div>
                <div className='flex flex-wrap bg-[#2D2D2D] justify-between gap-x-[10%] gap-y-[1.5rem] p-4'>
                    {<StatsCard type="simple" 
                        values={
                            {
                                chapters:props.chapters, 
                                volumes:props.volumes,
                                favorites:props.favorites,
                                score:props.score,
                                rank:props.rank
                            }
                        } 
                    />}
                    <div className='flex flex-col w-70' >
                        <strong>Published</strong>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M9 4v1H5v22h22V5h-4V4h-2v1H11V4zM7 7h2v1h2V7h10v1h2V7h2v2H7zm0 4h18v14H7zm6 2v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 17v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 21v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z"/></svg>
                            <span>{props.published}</span>
                        </div>
                    </div>
                    {<StatsCard type="tag" title='Themes' values={props.themes} />}
                    {<StatsCard type="tag" title='Demographic' values={props.demographics} />}
                    {<StatsCard type="tag" title='Serialization' values={props.serializations} />}                 
                </div>
            </article>

            
            <article className='min-w-[345px] w-full'>
                <div className='text-[18px] mb-4 mx-4 sm:mx-0'>
                    <h2>External Links</h2>
                </div>
                <div className='flex flex-wrap gap-4 bg-[#2D2D2D] justify-between p-4'>
                    {<StatsCard type='external' values={props.external} />}
                </div>
            </article>
        </>
    )
}
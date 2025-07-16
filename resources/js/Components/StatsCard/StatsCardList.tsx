import { TagList } from "../Tag/TagList";

type Title = {
    kind:'title', 
    values: Array<{type:string; title:string;}>}
type Tags = {
    kind:'tag',
    title: string,
    values: Array<{mal_id:number, type:string, name:string}>}
type External = {
    kind:'external', 
    values: Array<{name:string, url:string}>}
type SimpleStat = {
    kind:'simple', 
    values: {chapters:number, volumes:number}
};

type Props = Title | Tags | External | SimpleStat;


export const StatsCardList = (props:Props) => {
    switch (props.kind) {
        case 'title':

            return (
                <>
                    {
                    props.values.map((el, idx) => {
                        if (el.type !== 'Default') {
                            return (
                                <div key={idx} className='flex flex-col w-70'>
                                    <strong>{el.type}</strong>
                                    <span>{el.title}</span>
                                </div>
                            )
                        }
                    })
                    }
                </>
            )
        case 'tag':
            return (
                <div className='flex flex-col w-70' >
                    <strong>{props.title}</strong>
                    {props.values.length !== 0 ? <TagList listaTags={props.values}></TagList> : 'No register'}
                </div>
            )
        case 'external':
            return (
                <>
                    {props.values.map((el, idx) => {
                        return (
                            <div key={idx}>
                                <div className='flex flex-col w-70'>
                                    <a href={el.url}>
                                        <strong>
                                            {el.name}
                                        </strong></a>
                                </div>
                            </div>
                        )
                    })}
                </>
            )
        case 'simple':
            return (
                <>
                    <div className='flex flex-col w-70' >
                        <strong>Chapters</strong>
                        <span>{props.values.chapters ?? 'No register'}</span>
                    </div>
                    <div className='flex flex-col w-70' >
                        <strong>Volumes</strong>
                        <span>{props.values.volumes ?? 'No register'}</span>
                    </div>
                </>
            )
        default:
            break;
    }
}
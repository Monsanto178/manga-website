import { Tag } from "./Tag"

interface TagObj {
    mal_id:number;
    type:string;
    name: string;
    url?:string;
}

interface TagObjList {
    listaTags: TagObj[];
}

export const TagList = ({listaTags}: TagObjList) => {
    return(
    <>
    <ul className='flex flex-wrap gap-x-4 gap-y-6'>
        {listaTags.map((tag) => {
            return (<Tag key={tag.mal_id} name={tag.name} mal_id={tag.mal_id} type={tag.type}></Tag>)
        })}
    </ul>
    </>
)}
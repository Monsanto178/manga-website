import { Tag } from "./Tag"

interface TagObj {
    mal_id:number;
    name: string;
}

interface TagObjList {
    listaTags: TagObj[];
    count?:boolean;
    serialization?:boolean;
}

export const TagList = ({listaTags, count=false, serialization=false}: TagObjList) => {
    return(
    <>
    <ul className='flex flex-wrap gap-x-4 gap-y-6'>
        {listaTags.map((tag) => {
            return (<Tag key={tag.mal_id} data={tag} count={count} serialization={serialization}></Tag>)
        })}
    </ul>
    </>
)}
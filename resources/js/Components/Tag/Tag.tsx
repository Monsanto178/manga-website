interface Props {
    mal_id:number;
    type?:string;
    name: string;
    url?:string;
}

export const Tag = (props : Props) => {
    return (
        <>
        <li className='text-[12px] bg-[#FF6740] rounded-md p-1 sm:p-2 md:text-[16px]'>
            <a href={props.url ? props.url : '/'}>{props.name}</a>
        </li>
        </>
    );
}
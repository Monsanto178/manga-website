interface Props {
    mal_id:number;
    type?:string;
    name: string;
    url?:string;
}

export const Tag = (props : Props) => {
    return (
        <>
        <li className='text-[12px]  md:text-[16px]'>
            <a className="w-full bg-[#FF6740] rounded-md sm:p-2 p-1" href={props.url ? props.url : '/'}>{props.name}</a>
        </li>
        </>
    );
}
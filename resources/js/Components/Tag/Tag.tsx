interface Props {
    data: {
        mal_id:number;
        name: string;
        count?:number;
    }
    count:boolean;
    serialization?:boolean;
}

export const Tag = ({data, count=false, serialization=false} : Props) => {
    const cleanName = data.name.toLowerCase().split(' ').join('-');
    const endpoint = `/tags/${cleanName}`;
    return (
        <>
        
        {!count &&
        <li className='text-[12px] lg:text-[16px] md:text-[14px]'>
            {serialization &&
                <span className="w-full bg-[#FF6740] rounded-md sm:p-2 p-1 cursor-default">{data.name}</span>
            }
            {!serialization &&
                <a className="w-full bg-[#FF6740] rounded-md sm:p-2 p-1" href={endpoint}>{data.name}</a>
            }
        </li>
        }
        {count &&
        <li className='text-[12px] lg:text-[16px] md:text-[14px]'>
            <a className=" bg-[#2D2D2D] transition duration-300 ease-in-out hover:bg-[#FF6740] rounded-md sm:p-2 p-1 flex flex-col justify-center items-center w-[10rem]" href={endpoint}>
                <strong>{data.name}</strong>
                <span>({data.count})</span>
            </a>
        </li>
        }
        </>
    );
}
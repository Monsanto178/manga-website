type Type = "manga" | "novel" | "lightnovel" | "oneshot" | "doujin" | "manhwa" | "manhua";
type Status = 'publishing' | 'complete' | 'discontinued' | 'hiatus' | 'upcoming';
type OrderBy = 'score' | 'start_date' | 'popularity' | 'title';

interface Option {
    name: Type|Status|OrderBy;
    type: string | null;
    action: (val:Type|Status|OrderBy) => void;
}

export const OrderBtn = ({name, type, action}:Option) => {
    let value = '';
    if (name === 'lightnovel') {
        value = 'Light Novel';
    } else if(name === 'start_date') {
        value = 'Recents'
    } else {
        value = name.charAt(0).toUpperCase() + name.slice(1);
    }
    return (
        <div className="w-[8rem]">
            <button onClick={() => action(name)} className={`w-full p-2 rounded-[10px] cursor-pointer p-2 ${name === type ? 'bg-[#3C91E6] font-bold' : 'hover:bg-[#3C91E6] hover:font-bold bg-[#363636]'}`}>{value}</button>
        </div>
    )
}
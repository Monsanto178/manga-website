import { OrderBtn } from "./OrderBtn";

type Type = "manga" | "novel" | "lightnovel" | "oneshot" | "doujin" | "manhwa" | "manhua";
type Status = 'publishing' | 'complete' | 'discontinued' | 'hiatus' | 'upcoming';
type OrderBy = 'score' | 'start_date' | 'popularity' | 'title';

type Props = {
    props: {
        actualOrder: OrderBy | null;
        actualType: Type | null;
        actualStatus: Status | null;
        actions: {
            changeOrder: (val:Type|Status|OrderBy) => void;
            applyFilter: () => void;
        };
        hasError?: boolean;
    }
}

export const OrderCard = ({props}:Props) => {
    const typeEnum: Type[] = ["manga", "novel", "lightnovel", "oneshot", "doujin", "manhwa", "manhua"];
    const statusEnum: Status[] = ['publishing', 'complete', 'discontinued', 'hiatus', 'upcoming'];
    const orderEnum: OrderBy[] = ['score', 'start_date', 'popularity', 'title'];
    return (
        <>
        <article className="flex flex-col justify-center gap-4">
            <div>
                <strong>Types</strong>
            </div>
            <div className="flex flex-row justify-between justify-between sm:justify-start flex-wrap gap-2">
                {typeEnum.map((el:Type, idx) => {
                    return (<OrderBtn key={idx} name={el} type={props.actualType} action={props.actions.changeOrder}/>)
                })}
            </div>
        </article>
        <article className="flex flex-col justify-center gap-4">
            <div>
                <strong>Order By</strong>
            </div>
            <div className="flex flex-row justify-between justify-between sm:justify-start flex-wrap gap-2">
            {orderEnum.map((el, idx) => {
                return (<OrderBtn key={idx} name={el} type={props.actualOrder} action={props.actions.changeOrder}/>)
            })}
            </div>
        </article>
        <article className="flex flex-col justify-center gap-4">
            <div>
                <strong>Status</strong>
            </div>
            <div className="flex flex-row justify-between justify-between sm:justify-start flex-wrap gap-2">
            {statusEnum.map((el, idx) => {
                return (<OrderBtn key={idx} name={el} type={props.actualStatus} action={props.actions.changeOrder}/>)
            })}
            </div>
        </article>
        <article className="flex justify-end my-4">
            <button onClick={() => props.hasError ? {} : props.actions.applyFilter()} className={`${props.hasError ? 'bg-[#363636]' : 'bg-[#FF6740] cursor-pointer'} w-[7rem] rounded-[10px] h-10 `} disabled={true}>
                <strong>Apply Filters</strong>
            </button>
        </article>
        </>
    )
}
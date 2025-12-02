import { MangaType } from "./MangaType";
import { UserType } from "./UserType";

export type ReviewType = {
    mal_id:number;
    type?:string;
    date:string;
    review:string;
    reactions?:{
        overall: 0,
        nice: 0,
        love_it: 0,
        funny: 0,
        confusing: 0,
        informative: 0,
        well_written: 0,
        creative: 0
    };
    tags:Array<string>
    entry:MangaType;
    user:UserType;
}
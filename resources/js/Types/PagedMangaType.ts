import { MangaType } from "./MangaType";

export type PagedMangaType = {
    pagination: {
        last_visible_page:number;
        has_next_page:boolean;
        current_page:number;
        items?: {total:number}
    }
    data: Array<MangaType>;
}
import { TagType } from "./TagType";

export type CardType = {
    id:number;
    title:string;
    cover:string;
    tags:TagType[];
    author:string;
    description:string;
}
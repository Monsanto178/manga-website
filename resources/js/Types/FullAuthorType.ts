import { FullMediaType } from "./FullMediaType";

export type FullAuthorType = {
    mal_id:number;
    images:{
        jpg:{
            image_url:string
        }
    }
    name:string;
    given_name?:string;
    family_name?:string;
    alternate_names?: Array<string>;
    birthday:string;
    favorites:number;
    about:string;
    website_url?:string;
    manga?:Array<FullMediaType>
    anime?:Array<FullMediaType>
}
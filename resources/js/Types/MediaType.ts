export type MediaType = {
    mal_id:number;
    images:{
        jpg:{image_url:string};
        webp:{image_url:string};
    };
    title:string;
    type?:string;
}
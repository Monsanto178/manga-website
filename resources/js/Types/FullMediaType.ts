export type FullMediaType = {
    position:string;
    data:{
        mal_id:number;
        images:{
            jpg:{image_url:string};
            webp:{image_url:string};
        };
        title:string;
    }
}
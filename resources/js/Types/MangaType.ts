export type MangaType = {
    mal_id:number;
    images:{
        jpg: {
            image_url:string;
            small_image_url:string;
            large_image_url:string;
        },
        webp: {
            image_url:string;
            small_image_url:string;
            large_image_url:string;
        }
    }
    title:string;
    type:string;
    chapters:number;
    status:string;
    favorites:number;
    synopsis:string;
    score:number;
    genres:[
        {
            mal_id:number,
            type:string,
            name:string
        }
    ];
    demographics:[
        {
            mal_id:number,
            type:string,
            name:string
        }
    ]
}
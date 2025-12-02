export type FullMangaType = {
    mal_id:number;
    images:{
        jpg: {
            image_url:string, 
            small_image_url:string, 
            large_image_url?:string
        },
        webp: {
            image_url:string, 
            small_image_url:string, 
            large_image_url?:string
        }
    };
    title:string;
    type:string;
    chapters:number | null;
    status:string;
    favorites: number | null;
    synopsis:string;
    score: number | null;
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
    ];
    background?:string;
    titles:Array<{type:string, title:string}>;
    authors:[
        {
            mal_id:number,
            type:string,
            name:string
        }
    ];
    publishing:boolean;
    published: {
        prop:{
            from:{
                day:number,
                month:number,
                year:number
            },
            to?:{
                day:number,
                month:number,
                year:number
            }
        }
        string: string;
    };
    rank: number | null;
    volumes:number | null;
    themes:[
        {
            mal_id:number,
            type:string,
            name:string
        }
    ];
    serializations:
        Array<{
            mal_id:number,
            type:string,
            name:string
        }>;
    relations:
        Array<{
            relation:string,entry:Array<{mal_id:number,type:string,name:string,url:string}>
        }>
    external:Array<{name:string,url:string}>
}
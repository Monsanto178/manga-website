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

// type Relate = Media & {
//     type:string;
//     status:string;
//     images:{
//         jpg:{
//             image_url:string;
//             small_image_url:string;
//             large_image_url:string;
//         }
//         webp:{
//             image_url:string;
//             small_image_url:string;
//             large_image_url:string;
//         }
//     }
// }
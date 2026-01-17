import { TagList } from "@/Components";

type Title = {type:string; title:string};
type Tags = {mal_id:number, type:string, name:string};
type External = {name:string, url:string};
type SimpleStat = {chapters:number | null, volumes:number | null, favorites:number | null, score:number | null, rank:number | null};

type Kinds = Title | Tags | External | SimpleStat;

type Props<T> = {
    type: string;
    values: Array<T> | SimpleStat;
    title?:string
};


export const StatsCard = ({type, values, title}:Props<Kinds>) => {
    const langIcons = {
        Synonym: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><polygon points="7.25 14.25 1.75 8.75 8.75 1.75 14.25 1.75 14.25 7.25"/><circle cx="11" cy="5" r=".5" fill="currentColor"/></g></svg>,
        English: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#00247d" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"/><path fill="#cf1b2b" d="m25.14 23l9.712 6.801a4 4 0 0 0 .99-1.749L28.627 23zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943zm10-10h2.141l9.711-6.8a4 4 0 0 0-1.937-1.085L23 12.057zm-12.141 0L1.148 6.2a4 4 0 0 0-.991 1.749L7.372 13z"/><path fill="#eee" d="M36 21H21v10h2v-5.836L31.335 31H32a4 4 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21zM36 9a3.98 3.98 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4 4 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059zM13 5v5.837L4.664 5H4a4 4 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A4 4 0 0 0 0 9v.059L5.628 13H0v2h15V5z"/><path fill="#cf1b2b" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z"/></svg>,
        Japanese:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#eee" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z"/><circle cx="18" cy="18" r="7" fill="#ed1b2f"/></svg>,
        Spanish: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#c60a1d" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z"/><path fill="#ffc400" d="M0 12h36v12H0z"/><path fill="#ea596e" d="M9 17v3a3 3 0 1 0 6 0v-3z"/><path fill="#f4a2b2" d="M12 16h3v3h-3z"/><path fill="#dd2e44" d="M9 16h3v3H9z"/><ellipse cx="12" cy="14.5" fill="#ea596e" rx="3" ry="1.5"/><ellipse cx="12" cy="13.75" fill="#ffac33" rx="3" ry=".75"/><path fill="#99aab5" d="M7 16h1v7H7zm9 0h1v7h-1z"/><path fill="#66757f" d="M6 22h3v1H6zm9 0h3v1h-3zm-8-7h1v1H7zm9 0h1v1h-1z"/></svg>,
        German: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ffcd05" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0z"/><path fill="#ed1f24" d="M0 14h36v9H0z"/><path fill="#141414" d="M32 5H4a4 4 0 0 0-4 4v5h36V9a4 4 0 0 0-4-4"/></svg>,
        French: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ed2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4z"/><path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5z"/><path fill="#eee" d="M12 5h12v26H12z"/></svg>, 
    }
    if (Array.isArray(values)) {
        switch (type) {
            case 'title':
                return (
                    <>
                        {(values as Title[]).map((el, idx) => {
                            if (el.type !== 'Default') {
                                return (
                                    <div key={idx} className='flex flex-col w-70'>
                                        <strong>{el.type}</strong>
                                        <div className="flex items-center gap-2">
                                            {el.type === 'Synonym' && langIcons['Synonym']}
                                            {el.type === 'English' && langIcons['English']}
                                            {el.type === 'Japanese' && langIcons['Japanese']}
                                            {el.type === 'Spanish' && langIcons['Spanish']}
                                            {el.type === 'German' && langIcons['German']}
                                            {el.type === 'French' && langIcons['French']}
                                            <span>{el.title}</span>                                        
                                        </div>
                                    </div>
                                )
                            }
                        })
                        }
                    </>
                )
            case 'tag':
                const serialization = title === 'Serialization' ? true : false;
                return (
                    <div className='flex flex-col w-70 gap-y-4' >
                        <strong>{title}</strong>
                        {values.length !== 0 ? 
                            <TagList listaTags={(values as Tags[])} serialization={serialization}></TagList> 
                            : 'No Records'}
                    </div>
                )
            case 'external':
                return (
                    <>
                    {values.length !== 0 &&
                        (values as External[]).map((el, idx) => {
                            return (
                                <div key={idx}>
                                    <div className='flex flex-col w-70'>
                                        <a href={el.url} className="flex items-center gap-2 bg-[#FF6740] rounded-md sm:p-2 p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5"/></svg>
                                            <strong>{el.name}</strong>
                                        </a>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {values.length === 0 && 
                    <div className='flex flex-col w-70' >
                        <span>{'No Records'}</span>
                    </div>
                    }
                    </>
                )
            default:
                break;
        }
    } else if(type === 'simple' && typeof values === 'object') {
        return (
            <>
                <div className='flex flex-col w-70' >
                    <strong>Chapters</strong>
                    <div className="flex items-center gap-2">
                        <svg className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="m102.594 25.97l90.062 345.78L481.844 395L391.75 49.22zm-18.906 1.593c-30.466 11.873-55.68 53.098-49.75 75.312l3.25 11.78c.667-1.76 1.36-3.522 2.093-5.28C49.19 85.668 65.84 62.61 89.657 50.47l-5.97-22.907zm44.937 18.906l247.813 21.593l80.937 305.156l-249.344-20.064L128.626 46.47zM94.53 69.155c-16.66 10.01-29.916 28.068-38 47.406c-5.245 12.552-8.037 25.64-8.75 36.532l64.814 235.28c.293-.55.572-1.105.875-1.655c10.6-19.254 27.822-37.696 51.124-48.47L94.53 69.156zm74.876 287.563c-17.673 9.067-31.144 23.712-39.562 39c-4.464 8.105-7.262 16.36-8.688 23.75l11.688 42.405l1.625.125c-3.825-27.528 11.382-60.446 41.25-81.03l-6.314-24.25zm26.344 34.03c-32.552 17.26-46.49 52.402-41.844 72.906l289.844 24.53c-5.315-7.75-8.637-17.84-8.594-28.342l-22.562-9.063l46.625-7.31l-13.595-12.97c5.605-6.907 13.688-13.025 24.78-17.656L195.75 390.75z"/></svg>
                        <span>{values.chapters ?? 'No Records'}</span>
                    </div>
                </div>
                <div className='flex flex-col w-70' >
                    <strong>Volumes</strong>
                    <div className="flex items-center gap-2">
                        <svg className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="m102.594 25.97l90.062 345.78L481.844 395L391.75 49.22zm-18.906 1.593c-30.466 11.873-55.68 53.098-49.75 75.312l3.25 11.78c.667-1.76 1.36-3.522 2.093-5.28C49.19 85.668 65.84 62.61 89.657 50.47l-5.97-22.907zm44.937 18.906l247.813 21.593l80.937 305.156l-249.344-20.064L128.626 46.47zM94.53 69.155c-16.66 10.01-29.916 28.068-38 47.406c-5.245 12.552-8.037 25.64-8.75 36.532l64.814 235.28c.293-.55.572-1.105.875-1.655c10.6-19.254 27.822-37.696 51.124-48.47L94.53 69.156zm74.876 287.563c-17.673 9.067-31.144 23.712-39.562 39c-4.464 8.105-7.262 16.36-8.688 23.75l11.688 42.405l1.625.125c-3.825-27.528 11.382-60.446 41.25-81.03l-6.314-24.25zm26.344 34.03c-32.552 17.26-46.49 52.402-41.844 72.906l289.844 24.53c-5.315-7.75-8.637-17.84-8.594-28.342l-22.562-9.063l46.625-7.31l-13.595-12.97c5.605-6.907 13.688-13.025 24.78-17.656L195.75 390.75z"/></svg>
                        <span>{values.volumes ?? 'No Records'}</span>
                    </div>
                </div>
                <div className='flex flex-col w-70'>
                    <strong>Rank</strong>
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" d="M16 22v-9c0-1.414 0-2.121-.44-2.56C15.122 10 14.415 10 13 10h-2c-1.414 0-2.121 0-2.56.44C8 10.878 8 11.585 8 13v9m0 0c0-1.414 0-2.121-.44-2.56C7.122 19 6.415 19 5 19s-2.121 0-2.56.44C2 19.878 2 20.585 2 22m20 0v-3c0-1.414 0-2.121-.44-2.56C21.122 16 20.415 16 19 16s-2.121 0-2.56.44C16 16.878 16 17.585 16 19v3"/><path d="M11.146 3.023C11.526 2.34 11.716 2 12 2s.474.34.854 1.023l.098.176c.108.194.162.29.246.354c.085.064.19.088.4.135l.19.044c.738.167 1.107.25 1.195.532s-.164.577-.667 1.165l-.13.152c-.143.167-.215.25-.247.354s-.021.215 0 .438l.02.203c.076.785.114 1.178-.115 1.352c-.23.175-.576.015-1.267-.303l-.178-.082c-.197-.09-.295-.136-.399-.136s-.202.046-.399.136l-.178.082c-.691.318-1.037.478-1.267.303c-.23-.174-.191-.567-.115-1.352l.02-.203c.021-.223.032-.334 0-.438s-.104-.187-.247-.354l-.13-.152c-.503-.588-.755-.882-.667-1.165c.088-.282.457-.365 1.195-.532l.19-.044c.21-.047.315-.07.4-.135c.084-.064.138-.16.246-.354z"/></g></svg>
                        <span>{values.rank ?? 'Not Ranked'}</span>
                    </div>
                </div>
                <div className='flex flex-col w-70'>
                    <strong>Favorites</strong>
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="#fff" d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837t2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575t2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25t-.525-.125t-.425-.375m.95 4.725"/></svg>
                        <span>{values.favorites ?? 0}</span>                    
                    </div>
                </div>
                <div className='flex flex-col w-70'>
                    <strong>Score</strong>
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="#fff" d="M22 9.67a1 1 0 0 0-.86-.67l-5.69-.83L12.9 3a1 1 0 0 0-1.8 0L8.55 8.16L2.86 9a1 1 0 0 0-.81.68a1 1 0 0 0 .25 1l4.13 4l-1 5.68a1 1 0 0 0 1.47 1.08l5.1-2.67l5.1 2.67a.93.93 0 0 0 .46.12a1 1 0 0 0 .59-.19a1 1 0 0 0 .4-1l-1-5.68l4.13-4A1 1 0 0 0 22 9.67m-6.15 4a1 1 0 0 0-.29.88l.72 4.2l-3.76-2a1.06 1.06 0 0 0-.94 0l-3.76 2l.72-4.2a1 1 0 0 0-.29-.88l-3-3l4.21-.61a1 1 0 0 0 .76-.55L12 5.7l1.88 3.82a1 1 0 0 0 .76.55l4.21.61Z"/></svg>
                        <span>{values.score ?? 0}</span>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div className='flex flex-col w-70' >
                <span>{'No Records'}</span>
            </div>
        );
    }
}
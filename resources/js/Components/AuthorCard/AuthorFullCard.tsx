import { useEffect, useState } from "react";
import { FullAuthorType } from "@/Types";

type Prop = {
    author: FullAuthorType;
}
export const AuthorFullCard = ({author}:Prop) => {
    const [homeTown, setHomeTown] = useState<string | null>(null);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const clearText = (text:string): string[] => {
        const regex = /(Blood type:.*\n|Hometown:.*\n)/gi;
        const replacedText = text.replace(regex, '');
        return replacedText.split('\n');
    }

    const extractExtraInfo = (text:string) => {
        const homeMatch = text.match(/Hometown:\s*(.*?)\n/i);

        homeMatch ? setHomeTown(homeMatch[1]) : null;
    }
    const about = clearText(author.about);
    const birthday = formatDate(author.birthday);

    useEffect(() => {
        if (!homeTown) {
            extractExtraInfo(author.about);
        }
    }, [])

    return (
        <>
            <article className="flex flex-col w-full sm:w-[20%] min-w-46 p-2 gap-y-2 bg-[#363636]">
                <picture className="aspect-[1/1] w-full">
                    <img src={author.images.jpg.image_url} alt="author_cover" className="w-full h-full"/>
                </picture>
                
                <div className="flex flex-col gap-y-2">
                    <div className="flex flex-wrap gap-x-2 items-center">
                        <strong className="text-[18px] lg:tex-[22px] md:text-[20px]">{author.name}</strong>
                        {author.family_name && 
                            <span>{`(${author.given_name ?? ''} ${author.family_name})`}</span>                        
                        }
                    </div>
                    <div className="flex gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 512 512"><path fill="currentColor" d="M422 226.067H312v-96h-36A85.43 85.43 0 0 0 293.054 78.5c0-27.64-13.079-53.611-34.133-67.776l-8.932-6.01l-8.931 6.01C220 24.891 206.925 50.861 206.925 78.5a85.43 85.43 0 0 0 17.059 51.566H184v96H90a58.066 58.066 0 0 0-58 58V464a32.036 32.036 0 0 0 32 32h384a32.036 32.036 0 0 0 32-32V284.067a58.066 58.066 0 0 0-58-58M249.989 45.542c6.99 8.684 11.065 20.466 11.065 32.959s-4.075 24.276-11.065 32.959c-6.989-8.683-11.064-20.466-11.064-32.96S243 54.226 249.989 45.542M216 162.067h64v64h-64Zm-152 122a26.03 26.03 0 0 1 26-26h332a26.03 26.03 0 0 1 26 26v31.577l-21.6 9.531a33.28 33.28 0 0 1-26.809 0L362 308.588l-37.6 16.586a33.28 33.28 0 0 1-26.81 0L260 308.587l-37.6 16.586a33.28 33.28 0 0 1-26.81 0L158 308.588l-37.593 16.585a33.28 33.28 0 0 1-26.81 0L64 312.117ZM448 464H64V347.093l16.678 7.358a65.36 65.36 0 0 0 52.644 0L158 343.563l24.679 10.888a65.35 65.35 0 0 0 52.643 0L260 343.563l24.677 10.888a65.35 65.35 0 0 0 52.642 0L362 343.563l24.678 10.889a65.35 65.35 0 0 0 52.641 0l8.693-3.835L448.02 464Z"/></svg>
                        <span>{birthday  ?? 'No record'}</span>
                    </div>
                    {homeTown && 
                    <div className="flex gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="28" d="M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="28" d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"/></svg>
                        <span>{homeTown}</span>
                    </div>
                    }
                    <div className="flex gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825"/></svg>
                        <span>{author.favorites ?? 'No record'}</span>
                    </div>
                    <div className="flex gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.2"><path stroke-linecap="round" stroke-linejoin="round" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10"/><path stroke-linecap="round" stroke-linejoin="round" d="M13 2.05S16 6 16 12m-5 9.95S8 18 8 12s3-9.95 3-9.95M2.63 15.5H12m-9.37-7h18.74"/><path d="M21.879 17.917c.494.304.463 1.043-.045 1.101l-2.567.291l-1.151 2.312c-.228.459-.933.234-1.05-.334l-1.255-6.116c-.099-.48.333-.782.75-.525z" clip-rule="evenodd"/></g></svg>
                        <span>{author.website_url ?? 'No record'}</span>
                    </div>
                </div>
            </article>

            <article className="w-full sm:w-[80%] p-2 bg-[#363636]">
                <div className="flex flex-col gap-y-3">
                    {about.map((text, idx) => {
                        return (
                            <p key={idx}>{text}</p>
                        )
                    })}
                </div>
            </article>
        </>
    )
}
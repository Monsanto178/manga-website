import { ReactNode } from "react"

interface Props {
    children: ReactNode;
    title:string;
    uri:string;
    rounded?:boolean;
}

export const FooterBtn = ({children, title, uri, rounded=false}: Props) => {
    return(
    <a href={uri} title={title}
        className={`transform-scale duration-300 ease-in-out hover:scale-110 group ${rounded 
            ? 'hover:bg-[#363636d6] hover:text-black rounded-[50%] p-2 transition-all'
            : 'transition-transform'}`}>
        {children}
    </a>
    )
}
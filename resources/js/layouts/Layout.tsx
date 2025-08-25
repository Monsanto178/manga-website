import { ReactNode, useEffect, useState } from "react";
import { Header } from "../Components";
import { usePage } from "@inertiajs/react";

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
    const [isHome, setIsHome] = useState(false);
    const component = usePage();

    useEffect(() => {
        if (component.component === 'Home') {
            setIsHome(true);
        }
    }, [])
    return (
        <>
            <Header home={isHome}/>
            <main className="bg-[#111111] text-white h-[100%]">{children}</main>
        </>
    )
}
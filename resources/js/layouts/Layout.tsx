import { ReactNode, useEffect, useState } from "react";
import { Footer, Header } from "@/Components";
import { usePage } from "@inertiajs/react";
import ErrorBoundary from "@/ErrorBoundary/ErrorBoundary";

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
        <ErrorBoundary>
            <Header home={isHome}/>
            <main className="bg-[#111111] text-white h-[100%]">{children}</main>
            <Footer />
        </ ErrorBoundary>
    )
}
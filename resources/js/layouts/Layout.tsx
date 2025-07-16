import { Link } from "@inertiajs/react";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
    return (
        <>
            {/* <header>
                <nav className="bg-[#292929] text-white">
                    <Link className="" href="/">Home</Link>
                    <Link className="" href="/otro">Otro Lado</Link>
                </nav>
            </header> */}

            <main className="bg-[#1e1e1e]">{children}</main>
        </>
    )
}
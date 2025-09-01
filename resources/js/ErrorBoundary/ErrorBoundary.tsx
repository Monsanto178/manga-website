import { Component, ErrorInfo, ReactNode } from "react";
import cat from '../assets/images/cat-500.png';

interface ErrorBoundaryState {
    hasError:boolean;
}

interface ErrorBoundaryProps {
    children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props:ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error', error);
        console.error('Error info: ', errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <section className="flex flex-col gap-y-2 justify-center items-center  w-full bg-[#111111] text-white p-4 h-[100dvh]">
                    <article className="flex flex-col gap-y-2 justify-center bg-[#363636] rounded-[10px] overflow-hidden">
                        <picture>
                            <img src={cat} alt="we're-so-sorry" draggable={false}/>
                        </picture>
                        <div className="flex flex-col py-4">
                            <div className="text-[20px] md:text-[32px] sm:text-[26px] font-bold flex justify-center">
                                <h1>Oops... Something went wrong.</h1>
                            </div>
                            <div className="flex justify-around items-center w-full px-4">
                                <div>
                                    <a className="w-full h-full flex gap-x-2 transition-all p-4 duration-300 ease-in-out hover:bg-[#3C91E6]" href="/">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4.5 21.5h15"/><path d="M4.5 21.5v-13.5M19.5 21.5v-13.5"/><path d="M2 10l10 -8l10 8"/><path d="M9.5 21.5v-9h5v9"/></g></svg>
                                        <strong>Home</strong>
                                    </a>
                                </div>
                                <div>
                                    <button className="w-full h-full flex gap-x-2 transition-all p-4 duration-300 ease-in-out hover:bg-[#3C91E6] cursor-pointer"
                                            onClick={() => window.location.href = window.location.href}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="m400 148l-21.12-24.57A191.43 191.43 0 0 0 240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 0 0 181.07-128"/><path fill="currentColor" d="M464 97.42V208a16 16 0 0 1-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42"/></svg>
                                        <strong>Reload</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
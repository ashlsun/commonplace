import Sidebar from "./Sidebar";
import Marquee from "./Marquee";
import { ReactNode, useState } from "react";

type Props = {
    children: ReactNode;
  };

// type PropsWithChildren<P> = P & { children?: ReactNode };


export default function Layout({children} : Props) {
    const [openSidebar, setOpenSidebar] = useState(true);

    return (
        <>
        
        <div className="flex mix-blend-color-burn">

        <Sidebar isOpen={openSidebar} setOpen={(bool) => setOpenSidebar(bool)}/>
        
        <div className={"absolute z-0 p-10 left-0 mix-blend-color-burn md:px-14 md:w-full max-w-[768px] transition-transform duration-500 " + (openSidebar ? " md:translate-x-[300px] " : "")}>
            <Marquee/>
            {children}
        </div>
        </div>
        </>
    )
}
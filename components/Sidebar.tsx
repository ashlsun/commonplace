import { useState } from "react"
import { TbCircleX} from 'react-icons/tb';
import dayjs from 'dayjs';
import { signIn, signOut, useSession} from "next-auth/react";


export default function Sidebar(props: {
    isOpen: boolean
    setOpen: (openSidebar: boolean) => any
}) {

    const { data: session, status } = useSession()
    
    return (
        <>
        <div className={"fixed bg-white z-50 min-w-[300px] max-w-[300px] " + (props.isOpen ? "" : "-translate-x-[280px]") + " h-screen outline outline-1 transition-transform duration-500"}>
        {status === "authenticated" ? 
        <> 
            <div className="px-10 pt-10 pb-3 text-center">

                welcome <button className="text-green-900 font-bold" onClick={() => signOut()}>{session.user?.name}</button>! 🤗
                <div className="px-10 text-xs text-gray-800 pb-3">
                 {dayjs().format("dddd, MMM.D.YYYY")}
                </div>
            </div>
            
            {/* menu here */}
            <nav className="flex px-10">
                <button className="w-1/3 text-sm p-[0.5px] border-black border-[1px] rounded-l-lg bg-black text-white transition duration-200">
                    Today</button>
                <button className="w-1/3 text-sm p-[0.5px] border-black border-t border-b outline-offset-x-2 hover:bg-black hover:text-white transition duration-200">
                    Index</button> 
                <button className="w-1/3 text-sm p-[0.5px] border-black border-[1px] rounded-r-lg hover:bg-black hover:text-white transition duration-200">
                    Search</button> 

            </nav>


            <div className="mt-4 border-solid border-gray-600 border-t border-b py-4 pb-6  transition">
                <h1 className="px-10">🐚<span className="px-1 font-bold">Resurfaced</span></h1>
                <div className="flex">
                    
                    <div> <br/> <button className=" p-2 m-3">&lt;</button> </div>

                    <div>
                        <div className="absolute my-2 right-11 text-gray-700  z-20 rounded-full px-1 hover:text-black transition cursor-pointer">
                            <TbCircleX/>
                        </div>

                        <div className="italic mt-2 text-xs text-gray-800"> {dayjs().format("M/D/YY")} in <b>silk road</b></div>
                        
                        <div className="border border-1 cursor-pointer text-gray-800 border-gray-700 rounded-sm mt-1 p-2 text-xs hover:shadow-lg hover:border-black hover:text-black transition">
                            ...burned my thub and it really hurt owieweee mahek helped buti wish that i could not do that...
                        </div>
                    </div>

                    <div> <br/> <button className=" p-2 m-3">&gt;</button></div>
                </div>
    
            </div>


            <div className="mt-4 px-10 h-1/2">

                <h1 className="font-bold my-2">🌚<span className="px-1">Routines</span> (3)</h1>
                <p>
                    <a className="text-yellow-900 font-bold cursor-pointer hover:text-black transition">silk road</a>
                </p>
                <p>
                    <a className="text-yellow-900 font-bold cursor-pointer hover:text-black transition">exercise</a>

                </p>

                <p>
                    <a className="text-yellow-900 font-bold cursor-pointer hover:text-black transition">drink water</a>

                </p>

            </div>
            </>
        : (
            status === "loading" ? 
            <div className="text-center mt-14 px-10 text-gray-500">loading...</div>
            :
            <div className="text-center mt-14 px-10">
            <div>welcome <span className="font-bold text-gray-900">visitor</span>! 🤗</div> 
            <div className="leading-snug text-xs ">
                <br></br>
                <div>
                please make yourself at home! </div><br></br>
                <div> feel free to browse the public entries on this site & post your own entries as a guest.  </div>
                <br></br>
                <div> guest entries will automatically be deleted every week. click the button below to create your own account!</div>
            </div>
            <br></br>
            <button className="m-2 border border-1 rounded-full font-bold p-1 px-3 text-gray-900 border-black hover:bg-green-500 hover:text-black active:bg-black active:text-white transition" onClick={() => signIn("google")}>
                sign in with google
            </button>
        </div>
        )
       
        } 

        </div>


        <button 
        onClick={()=>props.setOpen(!props.isOpen)}
        className={"z-50 fixed top-10 left-[289px] bg-white hover:bg-black  border-black hover:text-white active:scale-75 border border-1 px-2 rounded-full transition-all duration-500 " + (props.isOpen ? "" : "-translate-x-[280px] transition-transform duration-500")}>
            {props.isOpen ? "<" : ">"}
        </button>


        </>
    )
}


import { useState } from "react"
import { TbCircleX} from 'react-icons/tb';
import dayjs from 'dayjs';


export default function Sidebar(props: {
    isOpen: boolean
    setOpen: (openSidebar: boolean) => any
}) {


    
    return (
        <>
        <div className={"fixed bg-white z-50 py-10 min-w-[300px] max-w-[300px] " + (props.isOpen ? "" : "-translate-x-[280px]") + " h-screen outline outline-1 transition-transform duration-500"}>

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
                        <div className="absolute my-2 right-11 text-gray-700 bg-white z-20 rounded-full px-1 hover:text-black transition cursor-pointer">
                            <TbCircleX/>
                        </div>

                        <div className="italic mt-2 text-xs text-gray-800"> {dayjs().format("M/D/YY")} in <b>silk road</b></div>
                        
                        <div className="outline outline-1 cursor-pointer text-gray-800 outline-gray-700 rounded-sm mt-1 p-2 text-xs hover:shadow-lg hover:outline-black hover:text-black transition">
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


        </div>


        <button 
        onClick={()=>props.setOpen(!props.isOpen)}
        className={"z-50 fixed top-10 left-[289px] hover:bg-black  outline-black hover:text-white active:scale-75 bg-white outline outline-1 px-2 rounded-full transition-all duration-500 " + (props.isOpen ? "" : "-translate-x-[280px] transition-transform duration-500")}>
            {props.isOpen ? "<" : ">"}
        </button>


        </>
    )
}
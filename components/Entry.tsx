import dayjs from "dayjs";
import axios from "axios";
import { SetStateAction, useState } from "react";
import { TbDots , TbCopy, TbDownload, TbLockAccess, TbBooks, TbEdit, TbTrash, TbArrowUpCircle, TbCircleOff} from "react-icons/tb"

export default function Entry(
    props: {
        _id: string,
        createdAt: string,
        journal: string,
        body: string
    }
) {
    const [highlightEntry, setHighlightEntry] = useState(false);
    const [openMenu, setOpenMenu] = useState(false)
    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState(props.body)
    const [entry, setEntry] = useState(props.body)

    const handleChange = (event: { target: { value: SetStateAction<string>; style: { height: string; }; scrollHeight: number; }; }) => {
        setDraft(event.target.value);
        event.target.style.height = "0px"
        event.target.style.height = event.target.scrollHeight + "px"
    };

    function onUpdate() {
        axios.put("/api/entry", {
            id: props._id,
            body: draft
        }).then(() => {
            setEntry(draft);
        }).catch(e => console.log(e));
    }

    return (
        <>
        <div
            className={"my-2 py-0 rounded-[1px] outline-offset-8 outline-1 transition-all outline-gray-600" + (openMenu ? " outline" : (highlightEntry ? " outline" : ""))}
            key={props._id}>
                <div className="flex relative">
                    <a className="font-bold text-green-900 hover:text-black transition cursor-pointer">ashley</a> 
                    <span>
                        <div className="text-gray-700"> , {dayjs(props.createdAt).format("h:mma")}  in  <a className=" text-yellow-900 hover:text-black transition-all" href={"/journals/"+props.journal}>{props.journal}</a>:</div>
                        
                    </span>
                    <div 
                        className={"absolute right-0 top-1  cursor-pointer hover:text-gray-800 transition-all" + (openMenu ? " text-gray-800" : " text-gray-600" )}
                        onClick={() => setOpenMenu(!openMenu)}
                        onMouseEnter={() => setHighlightEntry(true)}
                        onMouseLeave={() => setHighlightEntry(false)}>
                            <TbDots/>
                    </div>
                    <div
                        className={(openMenu ? "opacity-100 top-5 ": "origin-top-right opacity-0 scale-95 top-4 pointer-events-none " ) + "transition-all absolute right-0  border border-gray-800 border-1 bg-white rounded-sm text-sm z-10 shadow-lg"}
                    >
                        <div className="flex items-center pt-2 px-2 py-1 hover:bg-black hover:text-white transition duration-300 select-none cursor-pointer">
                            <TbCopy/> <span className="px-2">Copy link</span>
                        </div>
                        <div className="flex items-center px-2 py-1 hover:bg-black hover:text-white transition duration-300 select-none cursor-pointer">
                            <TbDownload/> <span className="px-2">Download text</span>
                        </div>
                        <div className="flex items-center px-2 py-1 hover:bg-black hover:text-white transition duration-300 select-none cursor-pointer">
                            <TbLockAccess/> <span className="px-2">Make public</span>
                        </div>
                        <div className="flex items-center px-2 py-1 hover:bg-black hover:text-white transition duration-300 select-none cursor-pointer">
                            <TbBooks/> <span className="px-2">Change journal</span>
                        </div>
                        <div 
                            className="flex items-center px-2 py-1 hover:bg-black hover:text-white transition duration-300 select-none cursor-pointer"
                            onClick={() => {setOpenMenu(false); setEditing(true)}}
                        >
                            <TbEdit/> <span className="px-2">Edit </span>
                        </div>
                        <div className="flex items-center pb-2 px-2 py-1 hover:bg-black hover:text-red-700 transition duration-300 select-none cursor-pointer">
                            <TbTrash/> <span className="px-2">Delete </span>
                        </div>
                    </div>
                </div>

                {editing ? 
                <>
                    <textarea
                        className="bg-transparent focus:outline-dashed outline-gray-700 outline-offset-1 rounded-sm resize-none text-gray-900 placeholder:text-gray-800 w-full"
                        autoFocus
                        onFocus={handleChange}
                        onChange={handleChange}
                        value={draft}
                    />
                    <div className="flex ">
                        <button 
                            className="flex items-center select-none cursor-pointer rounded-lg text-sm border border-black bg-lime-300 border-1 px-2 transition  hover:bg-lime-600 active:scale-90 mr-2 ml-auto"
                            onClick={() => {onUpdate(); setEditing(false)}}>
                            <TbArrowUpCircle/> <span className="px-1">Update</span></button>
                        <button 
                            className="flex items-center select-none cursor-pointer rounded-lg text-sm border border-black bg-slate-400 border-1 px-2 transition  hover:bg-slate-600 active:scale-90 "
                            onClick={() => setEditing(false)}>
                            <TbCircleOff/> <span className="px-1">Cancel</span></button>
                    </div>
                </>
                

                :
                <p className="whitespace-pre-wrap break-words post-body text-gray-900">
                    {entry} 
                </p>}
                                    
        </div>

        </>
    )
}
import dayjs from "dayjs";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { TbDots , TbCopy, TbDownload, TbLockAccess, TbBooks, TbEdit, TbTrash, TbArrowUpCircle, TbCircleOff, TbLockOpen, TbLink, TbBookmark} from "react-icons/tb"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Entry(
    props: {
        _id: string,
        createdAt: string,
        journal: string,
        body: string,
        onRequest: () => any
    }
) {
    const [highlightEntry, setHighlightEntry] = useState(false);
    const [openMenu, setOpenMenu] = useState(false)
    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState(props.body)
    const [entry, setEntry] = useState(props.body)
    const [isEmojiEntry, setEmojiEntry] = useState(!/\P{Extended_Pictographic}/u.test(entry) && entry.length < 10);

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

    function onDelete(){
        if (confirm("Are you sure you want to delete this entry? This action is irreversible.")){
            axios.delete("/api/entry", {data: {id: props._id}}).then(() => {
                props.onRequest();
                console.log("deleted");
            }).catch(e => console.log(e))
        }
    }

    useEffect(()=> {
        setEmojiEntry(/\P{Extended_Pictographic}/u.test(entry) && entry.length < 10)
    }, [entry]);

    return (
        <>
        <div
            className={"my-2 py-0 z-0 rounded-[1px] ring-offset-8 transition-all ring-gray-600" + (openMenu ? " ring-1" : (highlightEntry ? " ring-1" : ""))}
            key={props._id}>
                <div className="flex relative z-0">
                    <span className="flow">
                        <div className="text-gray-700"> {dayjs(props.createdAt).format("MMMM D, YYYY, h:mma")} </div>
                        <div className="text-gray-700 mt-0">
                            <span className="no-underline font-bold text-green-900 hover:text-black transition cursor-pointer">ashley</span> {editing ? <></> : isEmojiEntry ? <>entered <span className="text-black">{entry}</span></>: <></>} in <a className="no-underline text-yellow-900 hover:text-black transition-all" href={"/journals/"+props.journal}>{props.journal}</a>:
                            
                        </div>
                    </span>

                    <div 
                        className={"absolute right-0 top-1  cursor-pointer hover:text-gray-800 transition-all" + (openMenu ? " text-gray-800" : " text-gray-700" )}
                        onClick={() => setOpenMenu(!openMenu)}
                        onMouseEnter={() => setHighlightEntry(true)}
                        onMouseLeave={() => setHighlightEntry(false)}>
                            <TbDots/>
                    </div>
                    <div
                        className="absolute right-5 md:right-6 top-1 text-gray-700 hover:text-gray-800">
                        <TbBookmark/>

                    </div>
                    <div
                        className="absolute right-10 md:right-12 top-1 text-gray-700 hover:text-gray-800">
                       <TbLockOpen/>
                    </div>
                    
                    
                    
                    <div
                        className={(openMenu ? "z-10 opacity-100 top-5 ": "origin-top-right opacity-0 scale-95 top-4 pointer-events-none z-0 " ) + "transition-all absolute right-0 lg:right-[-165px] lg:top-[-9px] lg:origin-top-left border border-gray-800 border-1 bg-white rounded-sm text-sm shadow-lg"}
                    >
                        <div className="flex items-center p-1 px-2 select-none text-xs border-b-1 border-b bg-gray-400 border-gray-600">
                            Entry options:
                        </div>
                        <div className="flex items-center px-2 py-1 hover:bg-black hover:text-white transition duration-300 select-none cursor-pointer">
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
                        <div className="flex items-center pb-2 px-2 py-1 hover:bg-black hover:text-red-700 transition duration-300 select-none cursor-pointer"
                            onClick={onDelete}>
                            <TbTrash/> <span className="px-2">Delete </span>
                        </div>
                    </div>
                </div>

                {editing ? 
                <>
                    <textarea
                        className="bg-transparent focus:ring-gray-600 focus:ring-1 ring-offset-1 outline-none rounded-sm resize-none text-gray-900 placeholder:text-gray-800 w-full"
                        autoFocus
                        onFocus={handleChange}
                        onChange={handleChange}
                        value={draft}
                    />
                    <div className="flex items-end ">
                        <button 
                            className="flex items-center select-none cursor-pointer rounded-lg text-sm border border-black bg-lime-300 border-1 px-2 transition  hover:bg-lime-600 active:scale-90 mr-2 ml-auto"
                            onClick={() => {onUpdate(); setEntry(draft); setEditing(false)}}>
                            <TbArrowUpCircle/> <span className="px-1">Update</span></button>
                        <button 
                            className="flex items-center select-none cursor-pointer rounded-lg text-sm border border-black bg-slate-400 border-1 px-2 transition  hover:bg-slate-600 active:scale-90 "
                            onClick={() => {setDraft(entry); setEditing(false)}}>
                            <TbCircleOff/> <span className="px-1">Cancel</span></button>
                    </div>
                </>
                

                : isEmojiEntry ? <> </> :
                <div className="prose prose-ink text-gray-900
                    prose-h1:text-xl prose-h2:text-lg prose-h3:text-base 
                    prose-ul:list-none 
                    prose-a:underline-offset-[2px] prose-a:decoration-[0.8px] hover:prose-a:text-gray-800 prose-a:transition 
                    accent-black 
                    leading-normal 
                    entry 
                    
                    prose-p:break-words break-words
                    ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget="_blank">
                        {entry}
                    </ReactMarkdown>
                </div>}
                                    
        </div>

        </>
    )
}
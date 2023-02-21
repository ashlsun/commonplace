import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { TbBook2, TbEdit, TbTrash, TbCopy, TbWorld, TbHome, TbBuildingCommunity, TbSortDescending, TbSortAscending, TbFilter} from 'react-icons/tb';
import dayjs from 'dayjs';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Sidebar from '../components/Sidebar'

export default function Index() {
    const [postBody, setPostBody] = useState("");
    const [entries, setEntries] = useState<{body: string, journal: string, _id: string,  createdAt: string}[]>([]);
    const [journals, setJournals] = useState<{journal: string, _id: string}[]>([]);

    const [journal, setJournal] = useState("");
    const [isPostEmpty, setIsPostEmpty] = useState(true);
    const [openJournalMenu, setOpenJournalMenu] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(true)
    const [showTitle, setShowTitle] = useState(false)
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [whoseEntries, setWhoseEntries] = useState(0)
    const [sortRecentFirst, setSortRecentFirst] = useState(true)

    const [searchJournals, setSearchJournals] = useState("");
    const filteredJournals = journals.filter( d => d.journal.includes(searchJournals)).slice(0,6)
    


    const handleChange = (event: { target: { value: SetStateAction<string>; style: { height: string; }; scrollHeight: number; }; }) => {
        // 👇️ access textarea value
        setPostBody(event.target.value);
        setIsPostEmpty(!postBody);
        event.target.style.height = "0px"
        event.target.style.height = Math.max(64, event.target.scrollHeight) + "px"
      };

    function toggleWhoseEntries(){
        setWhoseEntries((whoseEntries+1)% 3);
    };

    function toggleJournalMenu(){
        setSearchJournals("");
        setOpenJournalMenu(!openJournalMenu);
    }

    function truncate(str: string) {
        if (str.length > 23) {
            return str.slice(0,21) + "..."
        }
        return str
        
    }

    function checkUniqueJournal(str: string) {
        if (!str) {
            return false
        } else for (let object of filteredJournals) {
            if (str === object.journal)
            {
                return false
            }
        }
        return true
    }

    function newJournal(){
        axios.post("/api/journal", {journal: searchJournals})
            .then(() => {
                setJournal(searchJournals)
                setSearchJournals("");
                onRequest();
            }).catch(e => console.log(e))
    }

    function newEntry(){
        axios.post("/api/entry", {body: postBody, journal: journal})
            .then(() => {
                setPostBody("");
                onRequest();
            }).catch(e => console.log(e))
    }

    function onRequest() {
        axios.get("/api/entry").then(res => {
            setEntries(res.data.entries);
        }).catch(e => console.log(e));

        axios.get("/api/journal").then(res => {
            setJournals(res.data.journals);
        }).catch(e => console.log(e));

    }


    function onDelete(id: string){
        axios.delete("/api/entry", {data: {id: id}}).then(() => {
            onRequest();
        }).catch(e => console.log(e))
    }


    function appendEmoji(e: any){
        setPostBody(postBody + e.native);
        setIsPostEmpty(false);
    }

    useEffect(()=> {
        onRequest();
    }, []);


    return (
        <>
            <div>
                <>

                <p className="text-sm text-gray-500">
                    <span className="text-black font-bold" > Entries</span> |
                    <a href="/journals">
                        <span className="cursor-pointer transition duration-300 hover:text-gray-700 hover:font-bold "> Journals</span> |
                    </a>
                    
                    <span> Grids</span> 
                </p>

                
                <div className="flex mt-3 items-start"> 
                    {/* why is it vertically padded without the items-end? */}
                    
                <div className="text-xs text-gray-800 mr-1">
                    Viewing:
                </div>
                    <button 
                        onClick={toggleWhoseEntries}
                        className="flex items-center mr-2 select-none cursor-pointer rounded-lg text-sm outline bg-pink-300 outline-1 px-2 transition duration-200 hover:text-black hover:outline-black hover:bg-pink-500 active:scale-90 " >
                            { (whoseEntries === 0) ? 
                                <>
                                    <TbHome/> 
                                    <div className="ml-1">Myself</div>
                                </>
                            : 
                                (whoseEntries === 1) ?
                                
                                <>
                                    <TbBuildingCommunity/>
                                    <div className="ml-1">Neighbors</div>
                                </>

                                :
                                <>
                                    <TbWorld/>
                                    <div className="ml-1">World</div>
                                </>

                            }

                    </button>

                    <button 
                        onClick={()=>{entries.reverse(); setSortRecentFirst(!sortRecentFirst)}}
                        className="flex items-center mr-2 select-none cursor-pointer rounded-lg text-sm outline bg-purple-300 outline-1 px-2 transition hover:text-black hover:outline-black hover:bg-purple-500 active:scale-90 " >
                            { sortRecentFirst ?
                                <> 
                                    <TbSortDescending/> <div className="ml-1">Sort: Newest</div>
                                </>
                                :
                                <>
                                    <TbSortAscending/> <div className="ml-1">Sort: Oldest</div>
                                </>
                            }
                            
                            
                            
                    </button>
                    {/* why wont these buttons change on hover? OHHH ITS BC OF EMOJI MART */}

                    <button 
                        className="flex items-center select-none cursor-pointer rounded-lg text-sm outline bg-indigo-400 outline-1 px-2 transition hover:text-black hover:outline-black hover:bg-indigo-600 active:scale-90 "> 
                            <TbFilter/> 
                            <div className="ml-1">Filter</div>
                    </button>
                </div>

                <div className="flex mt-10">

                    

                <button 
                    id="select-journal-button"
                    aria-controls="select-journal"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={toggleJournalMenu}
                    className={"items-center flex select-none active:scale-95 max-h-5 max-w-lg w-auto bg-yellow-300 text-sm rounded-lg outline outline-black outline-1 px-2 transition-all duration-100 hover:bg-yellow-700 hover:outline-bg" + (openJournalMenu ? " bg-yellow-500" : "")}>
                            <TbBook2/>
                         &nbsp;{journal ? 
                        
                        truncate(journal)
                        :

                        <>Select Journal</>}
                        
                </button>



                    <div className="relative bg-slate-900">

                        <div className={ "z-30 absolute left-3 " +
                            (openJournalMenu ? "h-100 opacity-100 absolute outline outline-1 backdrop-blur-xxl bg-white shadow-md pt-2 " : "h-0 origin-top-left scale-50 opacity-0 " ) +
                            "transition-all duration-100 ease-out text-sm rounded-sm"
                            // hover:shadow-md hover:shadow-yellow-600
                        }
                        // shadow-[#8f7f2f60] yellow?
                            id="select-journal"
                            aria-labelledby="select-journal-button"
                        >
                            <div className="min-w-[200px]">
                                <input
                                    autoFocus
                                    className="opacity-inherit outline-bottom-black px-2 py-1 w-full bg-transparent focus:outline-none placeholder:text-gray-800"
                                    type="text"
                                    value={searchJournals}
                                    onChange={(e) => setSearchJournals(e.target.value)}
                                    placeholder="Search journals...">
                                </input>
                            </div>
                            <hr></hr>

                            {filteredJournals.map (d => (
                                <>
                                    <div key={d._id}
                                        onClick={() => {if (openJournalMenu) {toggleJournalMenu(); setTimeout(()=> setJournal(d.journal), 120); }}}
                                        className={ (openJournalMenu ? "cursor-pointer " : "pointer-events-none ") + "px-2 py-1 hover:bg-black hover:text-white transition duration-200 delay-75"}>
                                    {d.journal}
                                    </div>
                                </>

                            )
                                
                            )}


                            {
                                checkUniqueJournal(searchJournals)
                                        ?
                                <div
                                    onClick={newJournal}
                                    className="cursor-pointer px-2 py-1 pb-2 hover:ease-out-100 hover:bg-black hover:text-white transition duration-200">
                                    + Create new "{searchJournals}"
                                </div>
                                :
                                <></>
                            }
                            
                        </div>

                    </div>

                
                
                </div>
                
                
                
                <textarea 
                    className="leading-snug mt-3 bg-transparent focus:outline-none resize-none text-gray-900 placeholder:text-gray-800 w-full"
                    placeholder="Type here... "
                    value={postBody}
                    onChange={handleChange}
                        
                />

                <br/>

                <button 
                    className="disabled:bg-transparent disabled:text-gray-700 disabled:outline-gray-700 disabled:cursor-not-allowed enabled:active:scale-95 select-none rounded-lg text-sm  bg-green-300 outline outline-black outline-1 px-2 mt-1 transition duration-200 hover:bg-green-800 "
                    disabled={isPostEmpty || !journal}
                    onClick={newEntry}>+ Publish
                </button>

                <button
                    className="ml-2 font-bold select-none rounded-lg text-sm  bg-cyan-300 outline outline-black outline-1 px-1 mt-1 active:scale-90 transition hover:bg-cyan-700 "
                    onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
                >
                    😀 
                </button>
                <div className={"emoji-picker z-20" +
                (openEmojiPicker ? "" : " origin-bottom-left scale-90 opacity-0 pointer-events-none z-0 " ) +
                " transition-all ease-out"}
                >
                    <Picker 
                            // className="z-40 absolute hidden" tailwind doesnt apply
                            data={data} 
                            emojiSize={20}
                            emojiButtonSize={30}
                            onEmojiSelect={appendEmoji} 
                            // onClickOutside={() => setOpenEmojiPicker(false)} - disables button
                            noCountryFlags={true}
                            skinTonePosition="none" 
                            previewPosition="none" 
                            searchPosition="top"
                            categories={['people', 'nature', 'foods', 'activity', 'places', 'objects', 'symbols', 'flags']} 
                            dynamicWidth={true}
                        />
                </div>
                   
                

                <br/><br/>{entries.map( d => (
                    <>
                        <div
                            className="py-0"
                            key={d._id}>
                                <div className="flex">
                                    <span>
                                        <div className="text-gray-600"> {dayjs(d.createdAt).format("h:mma") + " on " + dayjs(d.createdAt).format("MMM D, YYYY") } </div>
                                        <div className="text-gray-800">
                                            <a className="font-bold text-green-900 hover:underline">ashley</a> posted 
                                            in <a className="font-bold text-yellow-900 hover:underline" href={"/journals/"+d.journal}>{d.journal}</a>
                                        </div>
                                         
                                    </span>
                                
                                    <div className="absolute right-10">

                                    <button 
                                        className="z-0 text-gray-700 p-1 items-center select-none mx-1 last:origin-top-right text-xs outline rounded-md outline-gray-700 outline-1 px-1 mt-1 transition-all duration-200 hover:bg-black hover:outline-black hover:text-white">
                                        <TbCopy/>
                                    </button>

                                    <button 
                                        className="z-0 text-gray-700 p-1 items-center select-none mx-1 last:origin-top-right text-xs outline rounded-md outline-gray-700 outline-1 px-1 mt-1 transition-all duration-200 hover:bg-black hover:outline-black hover:text-white">
                                        <TbEdit/>
                                    </button>
                                    <button 
                                        onClick={() => onDelete(d._id)}
                                        className="z-0 text-gray-700 p-1 items-center select-none ml-1 last:origin-top-right text-xs outline rounded-md outline-gray-700 outline-1 px-1 mt-1 transition-all duration-200 hover:bg-black hover:outline-black hover:text-white">
                                        <TbTrash/>
                                    </button>
                                    </div>
                                    
                                </div> 
                                <p className="whitespace-pre-wrap post-body text-gray-900 mix-blend-normal">
                                    {d.body} 
                                </p>
                                
                                
                        </div>
                        <br/>
                        
                    </>
                    
                ))}

                
                
                </>
            </div>
            
        </>
    );
}

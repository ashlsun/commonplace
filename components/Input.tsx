import axios from "axios";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { SetStateAction, useState } from "react";
import { TbBook2, TbCalendarEvent } from "react-icons/tb";

export default function Input( props : {
    journals : {journal: string, _id: string}[];
    setJournals: (journals: {journal: string, _id: string}[]) => any;
    onRequest: () => any;
} ) {    
    const [postBody, setPostBody] = useState("");

    const [journal, setJournal] = useState("");
    const [isPostEmpty, setIsPostEmpty] = useState(true);
    const [openJournalMenu, setOpenJournalMenu] = useState(false)
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    const [searchJournals, setSearchJournals] = useState("");
    const filteredJournals = props.journals.filter( d => d.journal.includes(searchJournals)).slice(0,6)


    const handleChange = (event: { target: { value: SetStateAction<string>; style: { height: string; }; scrollHeight: number; }; }) => {
        // 👇️ access textarea value
        setPostBody(event.target.value);
        setIsPostEmpty(!postBody);
        event.target.style.height = "0px"
        event.target.style.height = Math.max(64, event.target.scrollHeight) + "px"
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
                props.onRequest();
            }).catch(e => console.log(e))
    }

    function newEntry(){
        axios.post("/api/entry", {body: postBody, journal: journal})
            .then(() => {
                setPostBody("");
                props.onRequest();
            }).catch(e => console.log(e))
    }

    function appendEmoji(e: any){
        setPostBody(postBody + e.native);
        setIsPostEmpty(false);
    }

return (
    <>
        <div>
            <div className="flex mt-10">

            <button 
                id="select-journal-button"
                aria-controls="select-journal"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={toggleJournalMenu}
                className={"items-center flex select-none active:scale-95 max-h-5 max-w-lg w-auto bg-yellow-300 text-sm rounded-lg border border-black border-1 px-2 transition-all duration-100 hover:bg-yellow-700 " + (openJournalMenu ? " bg-yellow-500" : "")}>
                        <TbBook2/>
                     &nbsp;{journal ? 
                    
                    truncate(journal)
                    :

                    <>Select Journal</>}
                    
            </button>



                <div className="relative bg-slate-900">

                    <div className={ "z-30 absolute left-3 " +
                        (openJournalMenu ? "h-100 opacity-100 absolute border border-black border-1 backdrop-blur-xxl bg-white shadow-md pt-2 " : "h-0 origin-top-left scale-50 opacity-0 " ) +
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
                                className="opacity-inherit border-bottom-black px-2 py-1 w-full bg-transparent focus:outline-none placeholder:text-gray-800"
                                type="text"
                                value={searchJournals}
                                onChange={(e) => setSearchJournals(e.target.value)}
                                placeholder="Search journals...">
                            </input>
                        </div>
                        <hr></hr>

                        {filteredJournals.map (d => (
            
                                <div key={d._id}
                                    onClick={() => {if (openJournalMenu) {toggleJournalMenu(); setTimeout(()=> setJournal(d.journal), 120); }}}
                                    className={ (openJournalMenu ? "cursor-pointer " : "pointer-events-none ") + "px-2 py-1 hover:bg-black hover:text-white transition duration-200 delay-75"}>
                                {d.journal}
                                </div>
                            

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

            
            <div className="items-center">

                <button 
                    className="disabled:bg-transparent disabled:text-gray-700 disabled:border-gray-700 disabled:cursor-not-allowed enabled:active:scale-95 select-none rounded-lg text-sm  bg-green-300 border border-black border-1 px-2 mt-1 transition duration-200 hover:bg-green-800 "
                    disabled={isPostEmpty || !journal}
                    onClick={newEntry}>+ Publish
                </button>

                <button
                    className="ml-2 font-bold select-none rounded-lg text-sm  bg-cyan-300 border border-black border-1 px-1 mt-1 active:scale-90 transition hover:bg-cyan-700 "
                    onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
                >
                    😀 
                </button>
                
            </div>
            


            <div className={"emoji-picker relative z-20" +
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
        </div>
        </>
    )
}
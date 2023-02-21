import { useEffect, useState } from "react";
import { TbCopy, TbEdit, TbFilter, TbSortDescending, TbTrash } from "react-icons/tb";
import axios from "axios";
import dayjs from "dayjs";

export async function getServerSideProps(context: any) {
    
    const journalName = context.params.journalName;
    return {props: {journalName: journalName}}
}

export default function JournalPage(props: {journalName:string}) {
    const [entries, setEntries] = useState<{body: string, journal: string, _id: string,  createdAt: string}[]>([]);
    
    function onRequest() {
        axios.get("/api/entry", {params: {journal: props.journalName}}).then(res => {
            setEntries(res.data.entries);
        }).catch(e => console.log(e));
    }
    
    function onDelete(id: string){
        axios.delete("/api/entry", {data: {id: id}}).then(() => {
            onRequest();
        }).catch(e => console.log(e))
    }

    useEffect(()=> {
        onRequest();
    }, []);

    return (
        <>
        
            <h1 className="font-bold">{props.journalName}</h1>
            <p>{entries.length} entries</p>
            <div className="flex mt-3 items-start"> 
                    <button 
                        className="flex items-center mr-2 select-none cursor-pointer rounded-lg text-sm outline bg-emerald-300 outline-1 px-2 transition hover:text-black hover:outline-black hover:bg-emerald-500 active:scale-90 " >
                            <TbSortDescending/> 
                            <div className="ml-1">Edit</div>
                    </button>

                    <button 
                        className="flex items-center select-none cursor-pointer rounded-lg text-sm outline bg-teal-400 outline-1 px-2 transition hover:text-black hover:outline-black hover:bg-teal-600 active:scale-90 "> 
                            <TbFilter/> 
                            <div className="ml-1">Privacy</div>
                    </button>
            </div>
            <div className="flex mt-3 items-start"> 
                    <button 
                        className="flex items-center mr-2 select-none cursor-pointer rounded-lg text-sm outline bg-[#34d399] outline-1 px-2 transition hover:text-black hover:outline-black hover:bg-emerald-500 active:scale-90 " >
                            <TbSortDescending/> 
                            <div className="ml-1">Plan a Streak</div>
                    </button>

                    <button 
                        className="flex items-center mr-2 select-none cursor-pointer rounded-lg text-sm outline bg-teal-400 outline-1 px-2 transition hover:text-black hover:outline-black hover:bg-teal-600 active:scale-90 "> 
                            <TbFilter/> 
                            <div className="ml-1">Routine</div>
                    </button>

                    <button 
                        className="flex items-center select-none cursor-pointer rounded-lg text-sm outline bg-teal-400 outline-1 px-2 transition hover:text-black hover:outline-black hover:bg-teal-600 active:scale-90 "> 
                            <TbFilter/> 
                            <div className="ml-1">Resurface</div>
                    </button>
            </div>
            <div className="flex mt-3 items-start"> 
                    {/* why is it vertically padded without the items-end? */}
                    <button 
                        className="flex items-center mr-2 select-none cursor-pointer rounded-lg text-sm outline bg-purple-300 outline-1 px-2 transition hover:text-black hover:outline-black hover:bg-purple-500 active:scale-90 " >
                            <TbSortDescending/> 
                            <div className="ml-1">Sort</div>
                    </button>
                    {/* why wont these buttons change on hover? OHHH ITS BC OF EMOJI MART */}

                    <button 
                        className="flex items-center select-none cursor-pointer rounded-lg text-sm outline bg-indigo-400 outline-1 px-2 transition hover:text-black hover:outline-black hover:bg-indigo-600 active:scale-90 "> 
                            <TbFilter/> 
                            <div className="ml-1">Filter</div>
                    </button>
            </div>

            <br/>
                {entries.map( d => (
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
                    ))
                }
                  
                        

        </>
    )
}
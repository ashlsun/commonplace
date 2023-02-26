import { useEffect, useState } from "react";
import axios from "axios";
import { TbWorld, TbHome, TbBuildingCommunity, TbSortDescending, TbSortAscending, TbFilter} from 'react-icons/tb';
import dayjs from 'dayjs';
import Entry from "../components/Entry"
import Input from "../components/Input";

export default function Index() {
    const [entries, setEntries] = useState<{body: string, journal: string, _id: string,  createdAt: string}[]>([]);
    const [journals, setJournals] = useState<{journal: string, _id: string}[]>([]);

    const [whoseEntries, setWhoseEntries] = useState(0)
    const [sortRecentFirst, setSortRecentFirst] = useState(true)
    const dateHeadings: any  = {} //TODO figure out how to annotate type
    let dates: string[] = []

    function createDateHeadings(){
        // for entry in entries:
        //     if date not in dateHeadings
        //         dateHeadings[date] = entry 
        //     else
        //         dateHeadings[date].append(entry)
        console.log("before loop")
        for (let i in entries){
            console.log(entries[i]._id);
            let date = dayjs(entries[i].createdAt).format('YYYY_MM_DD');
            if ( date in dateHeadings){
                console.log("appending");
                dateHeadings[date].push(entries[i]);
            } else {
                console.log("creating");
                dateHeadings[date] = [entries[i]];
            }
        }
        dates = Object.keys(dateHeadings);
        dates.sort();
        console.log(dates);
        console.log("after loop");
        console.log(dateHeadings);

    }


    function toggleWhoseEntries(){
        setWhoseEntries((whoseEntries+1)% 3);
    };

    function onRequest() {
        console.log("requesting")
        axios.get("/api/entry").then(res => {
            setEntries(res.data.entries);
            setSortRecentFirst(true);
        }).catch(e => console.log(e));
        console.log("got entries")

        axios.get("/api/journal").then(res => {
            setJournals(res.data.journals);
        }).catch(e => console.log(e));
        console.log("got journals")

    }

    useEffect(()=> {
        onRequest();
        console.log("requested!")

        createDateHeadings();
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
                        className="flex items-center mr-2 select-none cursor-pointer rounded-lg text-sm border bg-pink-300 border-1 px-2 transition duration-200 hover:text-black border-black hover:bg-pink-500 active:scale-90 " >
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
                        className="flex items-center mr-2 select-none cursor-pointer rounded-lg text-sm border border-black bg-purple-300 border-1 px-2 transition hover:bg-purple-500 active:scale-90 " >
                            { sortRecentFirst ?
                                <> 
                                    <TbSortDescending/> <div className="ml-1"><span className="hidden md:inline">Sort: </span>Newest</div>
                                </>
                                :
                                <>
                                    <TbSortAscending/> <div className="ml-1"><span className="hidden md:inline">Sort: </span>Oldest</div>
                                </>
                            }
                            
                                                        
                    </button>

                    <button 
                        className="flex items-center select-none cursor-pointer rounded-lg text-sm border border-black bg-indigo-400 border-1 px-2 transition  hover:bg-indigo-600 active:scale-90 "> 
                            <TbFilter/> 
                            <div className="ml-1">Filter</div>
                    </button>
                </div>


                <Input
                    journals={journals}
                    setJournals={setJournals}
                    onRequest={onRequest}
                />
            
                
                <br/><br/>


                {/* // why isn't it showing up */}
                {/* Oh i think it may be because dates is not useState? perhaps react doesn't recognize that it's updated since it was first initialized as empty
                 */}
                {dates.map( date => (
                    <div>
                        hi {date}
                    </div>
                    // <div key={date}>
                    //     {date}
                    //     {/* <div>
                    //         {dateHeadings[date].map(entry => (
                    //             <div key={entry._id}>
                    //             <Entry
                                    
                    //                 _id={entry._id}
                    //                 journal={entry.journal}
                    //                 createdAt={entry.createdAt}
                    //                 body={entry.body}
                    //             />
                    //             <br/>
                                
                    //         </div>
                    //         ))}
                    //     </div> */}
                    // </div>
                    ))
                }


                {entries.map( d => (
                    <div key={d._id}>
                        <Entry
                            
                            _id={d._id}
                            journal={d.journal}
                            createdAt={d.createdAt}
                            body={d.body}
                            onRequest={onRequest}
                        />
                        <br/>
                        
                    </div>
                    
                ))}

                
                
                </>
            </div>
            
        </>
    );
}

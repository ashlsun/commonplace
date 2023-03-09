import { useEffect, useState } from "react";
import axios from "axios";
import { TbWorld, TbHome, TbBuildingCommunity, TbSortDescending, TbSortAscending, TbFilter} from 'react-icons/tb';
import Entry from "../components/Entry"
import Input from "../components/Input";
import getServerSideProps from "../utils/serverProps";

export default function Index() {
    const [entries, setEntries] = useState<{body: string, journal: string, _id: string,  createdAt: string}[]>([]);
    const [journals, setJournals] = useState<{journal: string, _id: string}[]>([]);
    const [isLoadingEntries, setLoadingEntries] = useState(true);
    const [isLoadingJournals, setLoadingJournals] = useState(true);

    const [whoseEntries, setWhoseEntries] = useState(0)
    const [sortRecentFirst, setSortRecentFirst] = useState(true)

    function toggleWhoseEntries(){
        setWhoseEntries((whoseEntries+1)% 3);
    };

    function onRequest() {
        axios.get("/api/journal").then(res => {
            setJournals(res.data.journals);
            setLoadingJournals(false);
        }).catch(e => console.log(e));

        axios.get("/api/entry").then(res => {
            setEntries(res.data.entries);
            setSortRecentFirst(true);  
            setLoadingEntries(false);
        }).catch(e => console.log(e));
    }

    useEffect(()=> {
        onRequest();
        
    }, []);


    return (
        <>
            <div>
                <>

                <p className="text-sm text-gray-700">
                    <span className="text-black font-bold" > Entries</span> |
                    <a href="/journals">
                        <span className="cursor-pointer transition duration-300 hover:text-gray-900 hover:font-bold "> Journals</span> |
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
                    loadingJournals={isLoadingJournals}
                    journals={journals}
                    setJournals={setJournals}
                    onRequest={onRequest}
                />
            
                
                <br/><br/>


                { isLoadingEntries ? 
                    <div>Loading entries...</div>
                    :
                    entries.map( d => (
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
                        
                    ))
                }

            

                
                
                </>
            </div>
            
        </>
    );
}

export { getServerSideProps };
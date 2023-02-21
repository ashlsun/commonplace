import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { TbBook2, TbEdit, TbTrash, TbCopy} from 'react-icons/tb';
import dayjs from 'dayjs';


export default function Index() {
    const [journals, setJournals] = useState<{journal: string, _id: string}[]>([]);

    const [openSidebar, setOpenSidebar] = useState(true)
    const [showTitle, setShowTitle] = useState(false)

    const [searchJournals, setSearchJournals] = useState("");
    const filteredJournals = journals.filter( d => d.journal.includes(searchJournals))
    

    function truncate(str: string) {
        if (str.length > 23) {
            return str.slice(0,21) + "..."
        }
        return str
        
    }



    function onRequest() {
        axios.get("/api/journal").then(res => {
            setJournals(res.data.journals);
        }).catch(e => console.log(e));

    }

    function onDelete(id: string){
        axios.delete("/api/journals", {data: {id: id}}).then(() => {
            onRequest();
        }).catch(e => console.log(e))
    }

    useEffect(()=> {
        onRequest();
    }, []);


    return (
        <>
            <div>
                <>
                
                <p className="text-sm text-gray-500">
                    <a href="/">
                    <span className="cursor-pointer hover:text-gray-800 transition duration-300"> Entries</span>
                    </a> |
                    <span className="text-black font-bold" > Journals</span> |
                    <span> Grids</span> 

                </p>

                <br></br>
                {journals.map(d => (
                    <a href={"journals/"+d.journal}>
                        <div className="font-bold text-yellow-900 hover:text-black transition duration-300 cursor-pointer">{d.journal}</div>
                    </a>
                ))}


            </>

        </div>

            
        </>
    );
}

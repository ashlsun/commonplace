import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { TbBook2, TbEdit, TbTrash, TbCopy} from 'react-icons/tb';
import dayjs from 'dayjs';
import getServerSideProps from "../utils/serverProps";


export default function Journals() {
    const [journals, setJournals] = useState<{journal: string, _id: string}[]>([]);


    function onRequest() {
        axios.get("/api/journal").then(res => {
            setJournals(res.data.journals);
        }).catch(e => console.log(e));

    }

    function onDelete(id: string){
        axios.delete("/api/journal", {data: {id: id}}).then(() => {
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

export { getServerSideProps };
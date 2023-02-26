import { useEffect, useState } from "react";
import { TbCopy, TbEdit, TbFilter, TbSortDescending, TbTrash } from "react-icons/tb";
import axios from "axios";
import dayjs from "dayjs";
import Input from "../../components/Input";
import Entry from "../../components/Entry";

export async function getServerSideProps(context: any) {
    
    const journalName = context.params.journalName;
    return {props: {journalName: journalName}}
}

export default function JournalPage(props: {journalName:string}) {
    const [entries, setEntries] = useState<{body: string, journal: string, _id: string,  createdAt: string}[]>([]);
    const [journals, setJournals] = useState<{journal: string, _id: string}[]>([]);

    function onRequest() {
        axios.get("/api/entry", {params: {journal: props.journalName}}).then(res => {
            setEntries(res.data.entries);
        }).catch(e => console.log(e));

        axios.get("/api/journal").then(res => {
            setJournals(res.data.journals);
        }).catch(e => console.log(e));
    }
    

    useEffect(()=> {
        onRequest();
    }, []);

    return (
        <>
        
            <h1 className="font-bold">{props.journalName}</h1>
            <p>{entries.length} entries</p>

            <Input
                journals={journals}
                setJournals={setJournals}
                onRequest={onRequest}
            />
            
            <br/>
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
    )
}
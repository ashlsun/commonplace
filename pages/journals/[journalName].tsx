import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Entry from "../../components/Entry";
import serverProps from "../../utils/serverProps";

export default function JournalPage(props: {journalName:string}) {
    const [entries, setEntries] = useState<{body: string, journal: string, _id: string,  createdAt: string}[]>([]);
    const [journals, setJournals] = useState<{journal: string, _id: string}[]>([]);
    const [loadingEntries, setLoadingEntries] = useState(true);
    const [loadingJournals, setLoadingJournals] = useState(true);

    function onRequest() {
        axios.get("/api/journal").then(res => {
            setJournals(res.data.journals);
            setLoadingJournals(false);
        }).catch(e => console.log(e));

        axios.get("/api/entry", {params: {journal: props.journalName}}).then(res => {
            setEntries(res.data.entries);
            setLoadingEntries(false);
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
                loadingJournals={loadingJournals}
                journals={journals}
                setJournals={setJournals}
                onRequest={onRequest}
            />
            
            <br/>
            {loadingEntries ? 
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
                    
                ))}
                  
                        

        </>
    )
}

export async function getServerSideProps(context: any) {
    const journalName = context.params.journalName;

    const sessionProps = await serverProps(context);
    if (sessionProps.redirect) {

        return {redirect: {permanent: false, destination: "/signup"}}

    } else if (sessionProps.props && sessionProps.props.session) {

        return {props: {journalName: journalName, name: sessionProps.props?.name, session: sessionProps.props?.session}}
   
    }
        
    return {props: {journalName: journalName}}
    
    
}


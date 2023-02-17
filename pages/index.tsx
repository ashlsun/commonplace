import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

export default function Index() {
    const [newPostBody, setNewPostBody] = useState("");
    const [posts, setPosts] = useState<{body: string, _id: string, createdAt: string}[]>([]);


    
    const handleChange = (event: { target: { value: SetStateAction<string>; style: { height: string; }; scrollHeight: number; }; }) => {
        // 👇️ access textarea value
        setNewPostBody(event.target.value);
        event.target.style.height = "0px"
        event.target.style.height = event.target.scrollHeight + "px"
      };

    function onPublish(){
        axios.post("/api/post", {body: newPostBody})
            .then(() => {
                setNewPostBody("");
                onRequest();
            }).catch(e => console.log(e))
    }

    function onRequest() {
        axios.get("/api/post").then(res => {
            setPosts(res.data.posts);
        }).catch(e => console.log(e));
    }

    function onDelete(id: string){
        axios.delete("/api/post", {data: {id: id}}).then(() => {
            onRequest();
        }).catch(e => console.log(e))
    }

    function formatTime(timestr: string){
        return(timestr.toString());
    }

    useEffect(()=> {
        onRequest();
    }, []);


    return (
        <>
            <div>
                <>
                <div className="p-10">
                <div className="">Commonplace.day</div>
                <p className="text-sm text-gray-500">
                    <span className="text-black font-bold" > Entries</span> |
                    <span> Journals</span> |
                    <span> Grids</span> 
                </p>

                <button 
                    className="bg-yellow-200 text-sm rounded-lg outline outline-black outline-1 px-2 mt-5 transition duration-200 hover:bg-black hover:text-white"
                    >Select Journal</button>

                <textarea 
                    className="mt-3 bg-transparent focus:outline-none resize-none text-gray-900 placeholder:text-gray-800 w-full"

                    placeholder="Type here... "
                    value={newPostBody}
                    onChange={handleChange}
                        
                />

                <br/>

                <button 
                    className="rounded-lg text-sm  bg-green-200 outline outline-black outline-1 px-2 mt-1 transition duration-200 hover:bg-black hover:text-white"
                    onClick={onPublish}>+ Publish</button>


                <br/>
                <br/>

                {posts.map( d => (
                    <>
                        <p
                            className="py-0"
                            key={d._id}>
                                <span className="text-gray-600">
                                    {formatTime(d.createdAt)} —
                                </span> 
                                <span className="text-gray-900 mix-blend-normal">
                                    {d.body}
                                </span>
                                &ensp;
                                <button 
                                    onClick={() => onDelete(d._id)}
                                    className="text-xs outline rounded-full outline-black outline-1 px-1 mt-1 transition duration-200 hover:bg-black hover:text-white">
                            x
                        </button>
                        </p>
                        
                    </>
                    
                ))}
                </div>
                
                
                </>
            </div>
            
        </>
    );
}

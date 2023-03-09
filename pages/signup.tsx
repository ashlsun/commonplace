import { GetServerSidePropsContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { UserModel } from "../models/user";
import mongoose from "mongoose";


export default function Signup( props: {
    session : {
        user: {
            email: string,
            name: string,
            image: string,
        }
    }
}) {
    const [name, setName] = useState("")

    function checkUniqueName(name: string){
        return true // implement later
    }

    function createUser(){
        axios.post("api/user", {name: name, email: props.session.user.email})
            .then(() => {
                window.location.href= "/"
            }).catch(e => console.log(e))
    }

    return (
        <div>
            <h1 className="mt-10 font-bold text-lg">Finish setting up your account:</h1>
            <p className="text-gray-800">It's so wonderful to see a new face around here!</p>
            <br></br>
            <div>How do you want to be called?</div>
            <input 
                className="border focus:border-black border-gray-800 my-2 rounded-sm px-2 outline-none " 
                type="text"
                value={name} onChange={(e) => setName(e.target.value)}></input>
            <p className="text-xs text-gray-800"> (This will be your display name. You can always change it later.)</p>
            <br></br>
            <br></br>
            <div>
                {!!name ? <div>You'll appear as: <span className="text-green-900 font-bold">{name}</span></div> : <></> } 
            </div>

            <button 
                className="mt-16 border border-black rounded-full px-2 bg-green-200 hover:bg-green-800 disabled:bg-transparent disabled:border-gray-700 disabled:text-gray-700 disabled:cursor-not-allowed transition duration-300"
                onClick={() => createUser()}
                disabled={!checkUniqueName(name)}>+ Create account!</button>
        
            <div className="text-gray-800 mt-4">
            or <button onClick={() => signOut()} className="underline">
                cancel your sign up
            </button>!
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    if (!session) return {redirect: {permanent: false, destination: "/"}}

    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        
        const thisUser = await UserModel.findOne({email: session.user?.email});
        if (!thisUser) {
            return { props : {session :  session} }
        } 
        return {redirect: {permanent: false, destination: "/"}}

    } catch (e) {
        console.log(e)
    }

    return { props : {session :  session} }


}
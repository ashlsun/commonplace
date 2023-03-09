import mongoose from "mongoose";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { UserModel } from "../models/user";

export default async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    if (!session) return {props:{}}

    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        
        const thisUser = await UserModel.findOne({email: session.user?.email});

        if (!thisUser) {
            return {redirect: {permanent: false, destination: "/signup"}}
        }

        return {props : {name: thisUser.name, session: session}}

    } catch (e) {
        console.log(e);
        return { notFound: true};
    }

}
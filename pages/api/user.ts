import {NextApiRequest, NextApiResponse} from "next";
import mongoose from "mongoose";
import { UserModel } from "../../models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {

            if (!req.body.email) return res.status(400).send("Missing user email");

            if (!req.body.name) return res.status(400).send("Missing user name");


            await mongoose.connect(process.env.MONGODB_URL as string);
            
            await UserModel.create({email: req.body.email, name: req.body.name});
            
            return res.status(200).send("Success");

        } else if (req.method === "GET") {
            if (!req.query.email) return res.status(400).send("Missing user email");

            await mongoose.connect(process.env.MONGODB_URL as string);
            
            const user = await UserModel.findOne({email: req.query.email});

            return res.status(200).json({user: user})

        } else {
            return res.status(405).send("Method not allowed");
        }
    } catch (e) {
        return res.status(500).json({message: e})
    }
}

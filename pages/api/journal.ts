import {NextApiRequest, NextApiResponse} from "next";
import mongoose from "mongoose";
import { JournalModel } from "../../models/journal";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            console.log("yeup")
            if (!req.body.journal) return res.status(400).send("Missing journal name");

            console.log(req.body.journal)

            await mongoose.connect(process.env.MONGODB_URL as string);
            await JournalModel.create({journal: req.body.journal})
            ;
            
            return res.status(200).send("Success");

        } else if (req.method === "GET") {
            await mongoose.connect(process.env.MONGODB_URL as string);
            
            const journals = await JournalModel.find();

            return res.status(200).json({journals: journals})
            

        } else if (req.method === "DELETE"){
            if (!req.body.id) return res.status(400).send("Missing journal name");
            
            await mongoose.connect(process.env.MONGODB_URL as string);
            await JournalModel.deleteOne({_id: req.body.id});

            return res.status(200).send("Success")
        
        } else {
            return res.status(405).send("Method not allowed");
        }
    } catch (e) {
        return res.status(500).json({message: e})
    }
}

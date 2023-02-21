import {NextApiRequest, NextApiResponse} from "next";
import mongoose from "mongoose";
import { EntryModel } from "../../models/entry";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            if (!req.body.body) return res.status(400).send("Missing post body");
            
            await mongoose.connect(process.env.MONGODB_URL as string);
            await EntryModel.create({body: req.body.body, journal: req.body.journal});
            
            return res.status(200).send("Success");

        } else if (req.method === "GET") {

            console.log(req.query)
            await mongoose.connect(process.env.MONGODB_URL as string);

            if (req.query.journal) {
                const entries = await EntryModel.find({journal: req.query.journal}).sort({ createdAt: 'desc' });
                return res.status(200).json({entries: entries})

            } 
            const entries = await EntryModel.find().sort({ createdAt: 'desc' });
            return res.status(200).json({entries: entries})

        } else if (req.method === "DELETE"){
            if (!req.body.id) return res.status(400).send("Missing post ID");
            
            await mongoose.connect(process.env.MONGODB_URL as string);
            await EntryModel.deleteOne({_id: req.body.id});

            return res.status(200).send("Success")
        
        } else {
            return res.status(405).send("Method not allowed");
        }
    } catch (e) {
        return res.status(500).json({message: e})
    }
}

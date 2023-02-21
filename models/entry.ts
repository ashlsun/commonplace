import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema({
    body: {type: String, required: true},
    journal: {type: String, required: true},
},{
    timestamps: true,

})

export const EntryModel = mongoose.models.entry || mongoose.model("entry", EntrySchema);
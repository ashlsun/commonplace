import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
    journal: {type: String, required: true},
})

export const JournalModel = mongoose.models.journal || mongoose.model("journal", JournalSchema);
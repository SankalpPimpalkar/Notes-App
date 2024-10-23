import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    isStarred: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);
export default Note;
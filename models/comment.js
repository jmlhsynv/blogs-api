const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: new Date()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'auth'
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'blogs'
    }
})

module.exports = mongoose.model("comment", CommentSchema)
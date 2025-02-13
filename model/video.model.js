const mongoose = require('mongoose');
const VideoSchema = new mongoose.Schema({
    VideoId: {
        type: Number,
        required: true,
        unique: true
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: false
    },
    Url: {
        type: String,
        required: true
    },
    Likes: {
        type: Number,
        required: false
    },
    DisLikes: {
        type: Number,
        required: false
    },
    Views: {
        type: Number,
        required: false
    },
    CategoryId: {
        type: Number,
        required: true
    },
    Comments: {
        type: [String],
        required: false
    }
},{
    timestamps: true
}

);
const Video=mongoose.model("tblvideos",VideoSchema);
module.exports=Video;

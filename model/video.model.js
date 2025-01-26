const mongoose = require('mongoose');
const VideoSchema = new mongoose.Schema({
    VideoId: {
        type: String,
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
        type: String,
        required: false
    },
    DisLikes: {
        type: String,
        required: false
    },
    Views: {
        type: String,
        required: false
    },
    CategoryId: {
        type: String,
        required: true
    },
    Comments: {
        type: String,
        required: false
    }
},{
    timestamps: true
}

);
const Video=mongoose.model("Video",VideoSchema);
module.exports=Video;

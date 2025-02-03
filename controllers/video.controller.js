const Video = require("../model/video.model.js");
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    if (!videos) {
      return res.status(404).json({ message: "No videos found" });
    }
    res.status(200).json(videos);
    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.end();
  }
};
const getVideoById=async(req,res)=>{
    try {
        const {id}=req.params;
        const video=await Video.findById(id);
        if(!video){
            return res.status(404).json({message:"Video not found"});
        }
        res.status(200).json(video);
        res.end();

    }catch(error){
        res.status(500).json({ message: error.message });
        res.end();
    }
}
const addVideo=async(req,res)=>{
    try {
        const video= await Video.create(req.body);
        if(!video)
        {
            return res.status(400).json({message:"Video not created"});
        }
        res.status(201).json(video);
        res.end();

    }catch(error){
        res.status(500).json({ message: error.message });
        res.end();
    }
}
const updateVideo=async(req,res)=>{
    try {
        const {id}=req.params;
        const video=await Video.findByIdAndUpdate(id,req.body);
        if(!video)
        {
            return res.status(404).json({message:"Video not found"});
        }
        const updatedVideo=await Video.findById(id);
        res.status(200).json(updatedVideo);
        res.end();

    }catch(error){
        res.status(500).json({ message: error.message });
        res.end();
    }
}
const deleteVideo=async(req,res)=>{
    try {
        const {id}=req.params;
        const video=await Video.findByIdAndDelete(id);
        if(!video)
        {
            return res.status(404).json({message:"Video not found"});
        }
        res.status(200).json({ message: `Video ${id} has been deleted successfully` });
        res.end();
    }catch(error){
        res.status(500).json({ message: error.message });
        res.end();
    }
}
module.exports={getVideos,getVideoById,addVideo,updateVideo,deleteVideo};
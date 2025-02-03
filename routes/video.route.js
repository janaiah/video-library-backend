const router=require("express").Router();
const {getVideos,getVideoById,addVideo,updateVideo,deleteVideo}=require('../controllers/video.controller.js');

router.get("/",getVideos);
router.get("/:id",getVideoById);
router.post("/",addVideo);
router.put("/:id",updateVideo);
router.delete("/:id",deleteVideo);

module.exports=router
const router=require("express").Router();
const {getVideos,getVideoById,addVideo,updateVideo,deleteVideo}=require('../controllers/video.controller.js');
const {verifyToken}=require('../middlewares/authMiddleware.js');
const verifyRoles=require('../middlewares/roleMiddleware.js');
router.get("/",getVideos);
router.get("/:id",getVideoById);
router.post("/",verifyToken,verifyRoles("admin"),addVideo);
router.put("/:id",verifyToken,verifyRoles("admin"),updateVideo);
router.delete("/:id",verifyToken,verifyRoles("admin"),deleteVideo);

module.exports=router
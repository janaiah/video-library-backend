const express=require('express');
const router=express.Router();
const {getUsers,getUserById,addUser,updateUser,deleteUser} =require('../../controllers/user.controller.js') ;
const {}=require('../../controllers/video.controller.js');

router.get("/",getUsers);
router.get("/:id",getUserById);
router.post("/",addUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);


module.exports=router;
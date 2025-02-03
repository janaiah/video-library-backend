const router=require("express").Router();
const {register,login}=require('../controllers/auth.controller.js');
const {verifyToken,verifyUser}=require('../middlewares/authMiddleware.js');
const verifyRoles=require('../middlewares/roleMiddleware.js');
router.post("/register",register);
router.post("/login",login);
//example routes
//admin routes only
router.get("/admin",verifyToken,verifyRoles("admin"),(req,res)=>{
    res.status(200).json({message:"admin dashboard"});
    res.end();
});

//admin ,manager routes
router.get("/manager",verifyToken,verifyRoles("admin","manager"),(req,res)=>{
    res.status(200).json({message:"manager dashboard"});
    res.end();

});
//admin,manager,user routes
router.get("/user",verifyToken,verifyRoles("admin","manager","user"),(req,res)=>{
    res.status(200).json({message:"user dashboard"});
    res.end();
});
module.exports=router;


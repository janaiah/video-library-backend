const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    let token;
    //check if header has token
    const authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer'))
    {
        token=authHeader.split(" ")[1];
   
    if(!token)
    {
        return res.status(401).json({message:"NO token Access denied"});
    }
    //decode token
    try{

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        
        req.user={decoded};
        console.log(req.user)
        console.log(`decoded token ${req.user.decoded.Role}`);
        next();

    }catch(error)
    {
        res.status(401).json({message:"Invalid token"});
    }
}
else{
    res.status(401).json({message:"No token Access denied"});

}
}

const  verifyUser=(req,res,next)=>{

};

module.exports={verifyToken,verifyUser};
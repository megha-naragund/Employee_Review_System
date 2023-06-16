const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// Before performing the secure routes the accesstoken of the user is validated using JWT 
const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    // console.log("Validate token middleware : ", authHeader)
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        console.log("token from middleware :", token);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(402);
                throw new Error("User not authorized");
            }
            // console.log("decoded",decoded.user);
            req.user = decoded.user;    
            next();
        })
    }
});
module.exports = validateToken;
const jwt =require( "jsonwebtoken");
const { createError } =require( "./error.js");
const dotenv =require( "dotenv");

dotenv.config();
const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;
    // const token = res.send(req.signedCookies)
    if(!token){
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(403, "Invalid token"));
        req.user = user;
        next();
    });
}

const verifyUser = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.details?.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            return next(createError(403, "You are not authorized!"));
        }
    })
}
const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(!req.user.isAdmin){
            return next(createError(403, "You are not authorized!"));
        }
        else{
            next();
        }
    });
}
const verifySeller = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            return next(createError(403, "You are not authorized!"));
        }
        else{
            next();
        }
    });
}

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyUser,
    verifySeller
}
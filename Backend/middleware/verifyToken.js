const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(403).json("No token provided")
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token,"Your Secret Key");
        req.userId = decoded.id;
        next();
    }
    catch(err){
          return res.status(403).json("Invalid Token")
    }
}

module.exports = verifyToken;
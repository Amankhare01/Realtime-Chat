// const {JWT_SECRET}=rquire("./config");
// const jwt = require('jsonwebtoken');

// const authemiddleware = (req,res,next)=>{
//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startsWith('Bearer')){
//         return res.status(403).json({});
//     }

//     const token = authHeader.split('')[1];

//     try{
//         const decoded = jwt.verify(token, JWT_SECRET);
        
//         req.userId 

//     }
// }
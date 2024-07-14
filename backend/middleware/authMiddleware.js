const jwt = require('jsonwebtoken');

const authMiddleware = async(req,res,next) => {
  const header = req.headers.authorization;

  if(!header || !header.startsWith('Bearer ')){
    return res.status(403).json({})
  }

  const token = header.split(' ')[1];

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.userId;

    next();
  }catch(err){
    return res.status(403).json({err})
  }
}

module.exports = ({
  authMiddleware
})
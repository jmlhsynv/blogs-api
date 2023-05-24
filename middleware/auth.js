const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
        
            let decodedData;
    
            if(token){
                decodedData = jwt.verify(token, process.env.SECRET_TOKEN)
                req.userId = decodedData?.id
            }else{
                decodedData = jwt.decode(token)
                req.userId = decodedData?.sub
            }
            next()
        } else {
            res.status(401).json({message:"Auth required"})
        }
       
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}

module.exports = auth
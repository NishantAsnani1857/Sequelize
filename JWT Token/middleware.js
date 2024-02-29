const JWT = require('jsonwebtoken')

let checkToken = (req, res, next) => {
    let userToken = req.headers['authorization']
    if (userToken){
        JWT.verify(userToken, process.env.JWTSECRET, (error, decode) => {
            if (!error){
                req.user=decode
                next()
            }else {
                res.status(500).json({
                    message: "Token cannot be validated"
                })
            }
                
        });

    } 
}

module.exports=checkToken
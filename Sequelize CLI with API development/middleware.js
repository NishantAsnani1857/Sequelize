const JWT = require('jsonwebtoken')

let checkToken = (req, res, next) => {
    let userToken = req.headers['authorization']
    console.log(userToken);
    if (userToken){
        JWT.verify(userToken,process.env.JWTSECRET,{ algorithms: [process.env.JWTAlgorithm] },(error, decode) => {
            if (!error){
                req.user=decode
                next()
            }else {
                res.status(500).json({
                    message: "Token not validated",
                    error:error
                })
            }
                
        });

    } 
}

module.exports=checkToken
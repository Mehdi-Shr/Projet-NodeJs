const {Strategy} = require('passport-jwt')
const passport = require('passport')
const jwt = require("jsonwebtoken")
const userModel = require("../models/user")
const {Buffer} = require("node:buffer")

const secret = process.env.SECRET_TOKEN

const getToken = (req) => {
    let token = null
    if(req && req.cookies) token = req.cookies['token'];
    return token;
}
passport.use(new Strategy(
    {
        jwtFromRequest: getToken,
        secretOrKey: secret,
    },
    async (jwt_payload,done) => {
        if(jwt_payload.id){
            const repsonseApi = await userModel.get(jwt_payload.id)
            if(repsonseApi.status === 200){
                return done(null, repsonseApi.data)
            }
            return done(null,false)
        }
        return done(null,false)
    }
))

module.exports = {
    generateJWT: (user) => {
        return jwt.sign(user, secret);
    },
    middlewareAuthentication: passport.authenticate("jwt",{session: false}),
    getPayload: (req) => {
        const token = getToken(req)
        if(token){
            const [header,payload,signature] = token.split(".")
            return JSON.parse((new Buffer(payload, 'base64')).toString('ascii'))
        }
        return null
    }
}
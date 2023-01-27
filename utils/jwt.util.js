const {Strategy} = require('passport-jwt')
const passport = require('passport')
const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

const secret = process.env.SECRET_TOKEN

passport.use(new Strategy(
    {
        jwtFromRequest: (req) => {
            let token = null
            if(req && req.cookies) token = req.cookies['token'];
            return token;
        },
        secretOrKey: secret,
    },
    (jwt_payload,done) => {
        if(jwt_payload.id){
            const user = userModel.get(jwt_payload.id)
            if(user){
                return done(null, user)
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
    middlewareAuthentication: passport.authenticate("jwt",{session: false})
}
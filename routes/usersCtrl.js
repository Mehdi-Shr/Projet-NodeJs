const {generateJWT} = require("../utils/jwt.util")
const userModel = require("../models/user")
const {hash} = require('../utils/hash.util')

module.exports = {
    delete: (req, res) => {

    },
    update: (req, res) => {

    },
    get: async (req, res) => {
        res.json((await userModel.get(req.params.id)).data)
    },
    getAll: async (req, res) => {
        const data = (await userModel.getAll()).data
        res.json(data)
    },
    register: async (req, res) => {
        const {email,firstname,lastname,password,passwordConfirmation} = req.body
        if(email && password && passwordConfirmation && firstname && lastname){
            if(password === passwordConfirmation){
                const hashPassword = await hash(password)
                try {
                    userModel.create({
                        email, firstname,lastname,password: hashPassword
                    })
                    return res.json({message: "Your account is create"})
                } catch(e) {
                    return res.status(400).json({error: "Problem"})
                }
            }
            return res.status(400).json({error: "Passwords are differents"})
        }
        return res.status(400).json({error: "Missing parameters"})
    },
    login: async (req, res) => {
        const {email,password} = req.body
        if(email && password){
            const user = (await userModel.getByEmailAndPassword(email,await hash(password))).data[0]
            if(user){
                const token = generateJWT({
                    id: user['_id'],
                    active: user.active
                })
                return res.cookie("token",token).json({token})
            }
            return res.status(400).json({error: "User doesn't exists"})
        }
        return res.status(400).json({error: "Missing email or password"})
    }
}
const {generateJWT,getPayload} = require("../utils/jwt.util")
const userModel = require("../models/user")
const {hash} = require('../utils/hash.util')
const {analyseAndSendJSONResponse} = require("../utils/api.util")

module.exports = {
    delete: async (req, res) => {
        const {id} = req.params
        const payload = getPayload(req);
        if(id){
            if(payload && id == payload.id){
                try {
                    return res.json((await userModel.delete(id)).data)
                } catch(e) {
                    return res.json({error: "This user not exists"})
                }
            } else{
                return res.status(400).json({error: "Vous n'êtes pas autorisé à supprimer cet utilisateur"})
            }
        }
        return res.status(400).json({error: "Missing id parameter (route example: api/users/:id)"})
    },
    
    update: async (req, res) => {
        const {id} = req.params
        if(id){

        }
        return res.status(400).json({error: "Missing id parameter (route example: api/users/:id)"})
    },

    get: async (req, res) => {
        const {id} = req.params
        if(id){
            try {
                data = await userModel.get(id)
                console.log(data)
                return res.json("non")
            } catch(e) {
                return res.json({error: "This user not exists"})
            } finally {

            }
        }
        return res.status(400).json({error: "Missing id parameter (route example: api/users/:id)"})
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
                return analyseAndSendJSONResponse(res, await userModel.create({
                    email, firstname,lastname,password: hashPassword, active: true
                }))                    
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
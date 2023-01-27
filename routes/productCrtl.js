const productModel = require("../models/product")
const {analyseAndSendJSONResponse} = require("../utils/api.util")

module.exports = {
    get: async (req,res) => {
        const {id} = req.params
        if(id){
            return analyseAndSendJSONResponse(res, await productModel.get(id))
        }   
        return res.status(400).json({error: "Missing id parameter (route example: api/products/:id)"})
    },
    getAll: async (req,res) => {
        return analyseAndSendJSONResponse(res, await productModel.getAll())
    },
    update: async (req,res) => {
        const {id} = req.params
        const {marque, image, volume, type, prix, source, logoMarque, description, typeBouchon} = req.body
        if(id){
            if(marque || image || volume || type || prix || source || logoMarque || description || typeBouchon){
                return analyseAndSendJSONResponse(res, await productModel.update(id, {
                    marque, image, volume, type, prix, source, logoMarque, description, typeBouchon
                }))
            }
        }   
        return res.status(400).json({error: "Missing id parameter (route example: api/products/:id)"})
    },
    delete: async (req,res) => {
        const {id} = req.params
        if(id){
            return analyseAndSendJSONResponse(res, await productModel.delete(id))
        }   
        return res.status(400).json({error: "Missing id parameter (route example: api/products/:id)"})
    },
    create: async (req,res) => {
        const {marque, image, volume, type, prix, source, logoMarque, description, typeBouchon} = req.body
        if(marque && image && volume && type && prix && source && logoMarque && description && typeBouchon){
            return analyseAndSendJSONResponse(res, await productModel.create({
                marque, image, volume, type, prix, source, logoMarque, description, typeBouchon
            }))
        }
        return res.status(400).json({error: "Missing parameters"})
    }
}
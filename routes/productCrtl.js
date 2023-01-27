const productModel = require("../models/product")

module.exports = {
    get: async (req,res) => res.json("oui"),
    getAll: async (req,res) => res.json((await productModel.getAll()).data),
    update: (req,res) => {
        res.json("oui")
    },
    delete: (req,res) => {
        res.json("oui")

    },
    create: async (req,res) => res.json((await productModel.create(req.body)).data)
}
const productModel = require('../models/product')
const fs = require('fs')

module.exports = {
    async get(req, res) {
        const {id} = req.params
        if (id) {
            try {
                const product = await productModel.get(id)
                return res.json(product)

            } catch (e) {
                return res.status(400).json({message: "Le produit n'existe pas"})
            }
        }
        return res.status(400).json({message: "Veuillez renseigner l'id du produit"})
    },
    async getAll(req, res) {
        try {
            const products = await productModel.getAll()
            return res.json(products)
        } catch (e) {
            return res.status(400).json({message: "Nous ne parvenons pas à récupérer la liste de produit, veuillez reéssayer ulterieurement"})
        }
    },
    async update(req, res) {
        const {id} = req.params
        if (id) {
            const {marque, volume, type, prix, source, description, typeBouchon} = req.body
            if (marque || volume || type || prix || source || description || typeBouchon) {
                try {
                    const newProduct = await productModel.update(id, {
                        marque,
                        volume,
                        type,
                        prix,
                        source,
                        description,
                        typeBouchon
                    })
                    return res.json(newProduct)
                } catch (e) {
                    return res.status(500).json({message: "Le produit n'existe pas"})
                }
            }
            return res.status(400).json({message: "Il manque certaines propriétés pour modifier le produit (marque, volume, type, prix, source, description, typeBouchon)"})
        }
        return res.status(400).json({message: "Veuillez renseigner l'id du produit"})

    },
    async create(req, res) {
        const {image, logoMarque} = req.files
        const {marque, volume, type, prix, source, description, typeBouchon} = req.body
        if (image && logoMarque && image[0] && logoMarque[0]) {
            try {
                console.log(image[0])
                fs.renameSync(image[0].path, image[0].destination + "../" + image[0].filename)
                fs.renameSync(logoMarque[0].path, logoMarque[0].destination + "../" + logoMarque[0].filename)
                if (marque && volume && type && prix && source && description && typeBouchon) {
                    try {
                        const newProduct = await productModel.create({
                            marque,
                            image: "/images/" + image[0].filename,
                            volume,
                            type,
                            prix,
                            source,
                            logoMarque: "/images/" + logoMarque[0].filename,
                            description,
                            typeBouchon
                        })
                        return res.json(newProduct)
                    } catch (e) {
                        return res.status(400).json({message: "Nous ne parvenons pas à créer le produit, veuillez reéssayer ulterieurement"})
                    }
                }
                return res.status(400).json({message: "Il manque certaines propriétés pour créer le produit (marque, image, volume, type, prix, source, logoMarque, description, typeBouchon)"})
            } catch (e) {
                return res.status(500).json({message: "Erreur du serveur"})
            }
        }
        return res.status(400).json({message: "Il manque l'image ou le logoMarque"})
    },
    async delete(req, res) {
        const {id} = req.params
        if (id) {
            try {
                const {image, logoMarque} = await productModel.get(id)
                console.log(image, logoMarque)
                if (image && logoMarque) {
                    try {
                        try {
                            fs.rmSync(__dirname + "/.." + image.replace('images', 'media'))
                            fs.rmSync(__dirname + "/.." + logoMarque.replace('images', 'media'))
                        } catch (e) {
                            return res.status(500).json({message: "Erreur nous ne parvenons pas à supprimer les images "})
                        }
                        const result = await productModel.delete(id)

                        return res.json(result)
                    } catch (e) {
                        return res.status(500).json({message: "Le produit n'existe pas"})
                    }
                }
            } catch (e) {
                console.log(e)
                return res.status(400).json({message: "Le produit n'existe pas"})
            }
        }
        return res.status(400).json({message: "Veuillez renseigner l'id du produit"})
    },
}
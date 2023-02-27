const path = require('path')

module.exports = {
    async get(req, res) {
        const {name} = req.params
        return await res.sendFile(path.resolve(__dirname+"/../media/" + name),(e) => {
            return res.json({message: "Fichier introuvable"})
        })
    }
}
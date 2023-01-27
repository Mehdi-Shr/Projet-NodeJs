const {api,createDefaultActionsFor} = require("../utils/api.util")

module.exports = {
    ...createDefaultActionsFor("products"),
    create: async (product) => await api.post("/products",product), 
    update: (id, product) => {

    }
}
const axios = require("axios")

const api = axios.create({
    baseURL: "https://tpnodejs-ee81.restdb.io/rest",
    headers: {
        "x-apikey": process.env.API_KEY
    }
})

module.exports = {
    api,
    createDefaultActionsFor: (collection) => ({
        get: async (id) => await api.get(`/${collection}/${id}`),
        getAll: async () => await api.get(`/${collection}`),
        delete: async (id) => await api.delete(`/${collection}/${id}`),
    })
}
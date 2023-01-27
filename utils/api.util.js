const axios = require("axios")

const api = axios.create({
    baseURL: "https://tpnodejs-ee81.restdb.io/rest",
    headers: {
        "x-apikey": process.env.API_KEY
    }
})

module.exports = {
    api,
    analyseAndSendJSONResponse: (res,responseApi) => {
        if(responseApi.status === 200){
            return res.json(responseApi.data)
        } else {
            return res.status(responseApi.status).json({error: responseApi.error})
        }
    },
    createDefaultModelFor: (collection) => ({
        get: async (id) => {
            try {
                return await api.get(`/${collection}/${id}`)
            } catch(e) {
                return {status: e.response.status, error: e.response.statusText}
            }
        },
        getAll: async () => {
            try {
                return await api.get(`/${collection}`)
            } catch(e) {
                return {status: e.response.status, error: e.response.statusText}
            }
        },
        delete: async (id) => {
            try {
                return await api.delete(`/${collection}/${id}`)
            } catch(e) {
                return {status: e.response.status, error: e.response.statusText}
            }
        },
        create: async (data) => {
            try {
                return await api.post(`/${collection}`,data)
            } catch(e) {
                return {status: e.response.status, error: e.response.statusText}
            }
        }, 
        update: async (id,data) => {
            try {
                return await api.patch(`/${collection}/${id}`,data)
            } catch(e) {
                return {status: e.response.status, error: e.response.statusText}
            }
        }, 
    })
}
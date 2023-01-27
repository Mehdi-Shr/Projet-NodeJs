const {api,createDefaultModelFor} = require("../utils/api.util")
const collection = "users"

module.exports = {
    ...createDefaultModelFor(collection),
    getByEmailAndPassword: async (email, password) => {
        try {
            return await api.get(`/${collection}?q=${JSON.stringify({email, password})}`)
        } catch(e) {
            return {status: e.response.status, error: e.response.statusText}
        }
    }
}
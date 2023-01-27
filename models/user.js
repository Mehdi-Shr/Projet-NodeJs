const {api,createDefaultActionsFor} = require("../utils/api.util")

module.exports = {
    ...createDefaultActionsFor("users"),
    getByEmailAndPassword: async (email, password) => await api.get(`/users?q=${JSON.stringify({email, password})}`), 
    create: async (user) => await api.post("/users",{
        ...user,
        active: true
    }), 
    update: () => {

    },
}
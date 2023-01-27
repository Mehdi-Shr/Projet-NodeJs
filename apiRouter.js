const express = require('express')
const router = new express.Router()
const userCtrl = require('./routes/usersCtrl')
const productCtrl = require('./routes/productCrtl')

const {middlewareAuthentication} = require("./utils/jwt.util")

// Route to login and get JWT token 
router.post("/users/login",userCtrl.login)

// Routes who allows to READ, CREATE, UPDATE AND DELETE users (We need to give a JWT token with cookie to access to these routes )
router.get("/users",middlewareAuthentication,userCtrl.getAll)
router.get("/users/:id",middlewareAuthentication,userCtrl.get)
router.delete("/users/:id",middlewareAuthentication,userCtrl.delete)
router.patch("/users/:id",middlewareAuthentication,userCtrl.update)

// Route to REGISTER a user
router.post("/users/register",userCtrl.register)

// CRUD routes for products collection (We need to give a JWT token with cookie to access to DELETE, CREATE AND UPDATE products )
router.get("/products",productCtrl.getAll)
router.get("/products/:id",productCtrl.get)
router.delete("/products/:id",middlewareAuthentication,productCtrl.delete)
router.patch("/products/:id",middlewareAuthentication,productCtrl.update)
router.post("/products/create",middlewareAuthentication,productCtrl.create)

module.exports = {
    router
}
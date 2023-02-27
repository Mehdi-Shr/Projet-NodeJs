const express = require('express')
const router = new express.Router()

const userActions = require("./routes/userActions");
const productActions = require("./routes/productActions");
const imageActions = require("./routes/imageActions");

const {middlewareAuthentication} = require("./utils/jwt.util")
const {middlewareUploadImages} = require("./utils/upload.util");

// Route which allows user to login and get a JWT token 
router.post("/user/login",userActions.login)
router.post("/user/register",userActions.register)
router.get("/user",middlewareAuthentication,userActions.get)
router.patch("/user",middlewareAuthentication,userActions.updateInformations)
router.patch("/user/password",middlewareAuthentication,userActions.updatePassword)

// CRUD routes for products collection (We need to give a JWT token with cookie to access to DELETE, CREATE AND UPDATE products)
router.get("/products",productActions.getAll) // TO GET a product
router.get("/products/:id",productActions.get) // To GET the product list
router.delete("/products/:id",middlewareAuthentication,productActions.delete) // To DELETE a product
router.patch("/products/:id",middlewareAuthentication,productActions.update) // To UPDATE a product
router.post("/products",[middlewareAuthentication, middlewareUploadImages],productActions.create) // To CREATE a product

// GET an image
router.get('/images/:name',imageActions.get)

module.exports = {
    router
}
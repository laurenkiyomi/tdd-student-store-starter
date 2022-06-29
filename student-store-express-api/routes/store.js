const express = require('express');
const Store = require('../models/store');
const router = express.Router();
const { NotFoundError } = require("../utils/errors")


router.post('/', async (req, res, next) => {
    try {
        const shoppingCart = req.body.shoppingCart
        const user = req.body.user
        const newPurchase = await Store.recordPurchase({ shoppingCart, user })
        res.status(201).json( { purchase: newPurchase } )
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const products = await Store.listProducts()
        res.status(200).json({ products })
    } catch (err) {
        next(err)
    }
})


router.get('/:productId', async (req, res, next) => {
    try {
        const productId = req.params.productId
        const product = await Store.fetchProductById(productId)

        if (!product) {
            throw new NotFoundError("Product not found")
        }
        res.status(200).json({ product })
    } catch (err) {
        next(err)
    }
})





module.exports = router;
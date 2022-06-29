const express = require('express');
const Store = require('../models/store');
const router = express.Router();
const { NotFoundError } = require("../utils/errors")

router.get('/', async (req, res, next) => {
    try {
        const purchases = await Store.listPurchases()
        res.status(200).json({ purchases })
    } catch (err) {
        next(err)
    }
})

module.exports = router;
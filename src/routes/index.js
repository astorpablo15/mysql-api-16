const express = require('express');
const getEnv = require('../services/environment/env.service');
const productsRoutes = require('./products/products.routes');

const router = express.Router();

router.get('/health', async(_req, res) => {
    res.status(200).json({
        success: true,
        server: 'Up!',
        environment: getEnv()
    })
})
.use('/products', productsRoutes);

module.exports = router;
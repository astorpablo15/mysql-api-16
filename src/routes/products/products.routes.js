const express = require('express');
const _ = require('lodash');
const Products = require('../../services/database/products/products.knex');

const router = express.Router();

const productService = new Products();

router.post('/', async (req, res, next) => {
    const  { body } = req;
    if(_.isNil(body)){
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }
    try{
        const data = await productService.createProduct(body);
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
})

router.get('/:productCode', async (req, res) => {
    const {productCode} = req.params;
    if(_.isNil(productCode)){
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }
    try{
        const data = await productService.getProduct(productCode);
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data);
    }catch(err){
        next(err);
    }
})

module.exports = router;
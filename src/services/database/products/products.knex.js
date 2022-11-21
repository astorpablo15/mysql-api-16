const knexConfig = require('../config');
const knexDb = require('knex');
const { v4: uuidv4 } = require('uuid');

class Products{
    constructor(){
        this.knexConfig = knexConfig;
    }

    async createProduct(product){
        const knex = knexDb(this.knexConfig);
        Object.assign(product, {
            code: uuidv4()
        })
        return new Promise((resolve, reject) => {
            knex('products').insert(product).then(() => {
                resolve({
                    success: true,
                    data: product
                });
            }).catch(err => {
                reject(err)
            }).finally(() =>{
                knex.destroy();
            });
        })
    }

    async getProduct(productCode){
        const knex = knexDb(this.knexConfig);
        try{
            const data = await knex('products').where('code', '=', productCode).select('*');
            if(data.length == 0){
                return {
                    success: true,
                    message: 'Product not found'
                }
            }
            const proudctFormatted = JSON.parse(JSON.stringify(data[0]));
            knex.destroy();
            return {
                success: true,
                data: proudctFormatted
            }
        }catch(err){
            console.error(err);
            knex.destroy();
            return {
                success: false,
                message: err.message
            }
        }
    }

}

module.exports = Products;
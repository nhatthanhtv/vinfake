const Product = require('../model/Product')
const { mutipleMongooseToObject,mongooseToObject } = require('../../util/mongoose')

class ProductController {

    // GET [/cart] /cart
    index(req, res,next) {

    }

    info(req, res,next) {
        
        Product.findOne({ 'data.items': {$elemMatch: {seoName: req.params.seoName} }})
            .then(items => {
            
               var dataItems = items.data.items.find(items =>{
                    return items.seoName === req.params.seoName
                })
                res.render('product',{ dataItems: dataItems});
            })
            .catch(next);
       
    }
            
}

module.exports = new ProductController
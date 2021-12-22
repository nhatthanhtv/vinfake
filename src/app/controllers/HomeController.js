const Product = require('../model/Product')
const { mutipleMongooseToObject } = require('../../util/mongoose')
class HomeController {

    // GET [/] home
    index(req, res,next) {
        Product.find({})
            .then(product => {
                res.render('home',{
                    product: mutipleMongooseToObject(product)
                })
                
            })
    }
}

module.exports = new HomeController
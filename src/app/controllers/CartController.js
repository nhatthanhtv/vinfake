const Product = require('../model/Product')
const OrderProduct = require('../model/OrderProduct')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class CartController {

    // GET [/cart] /cart
    index(req, res, next) {
        res.render('cart')
    }

    // POST [/cart/pay]
    pay(req, res, next) {
        OrderProduct.create({ 
            name:req.body.fullname,
            email:req.body.email,
            address:req.body.address,
            phone:req.body.phone,
            dataItems: JSON.parse(req.body.dataItemsOrder),
        })
            .then(data => {
                
                res.send('bạn đã đạt hàng thành công ')
            })
            .catch(next)
    }



}

module.exports = new CartController
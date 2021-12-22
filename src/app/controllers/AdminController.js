const Product = require('../model/Product')
const OrderProduct = require('../model/OrderProduct')
const User = require('../model/User')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class AdminController {

    // GET [/admin] /admin
    index(req, res, next) {
        res.render('admin')
    }

    // 
    login(req, res, next){
        User.findOne({user:req.body.fullname})
            .then(data => {
                res.redirect('/admin/orderlist')
            })
    }

    orderlist(req, res, next){
        OrderProduct.find({})
            .then(listOrder => {
                res.render('orderlist',{
                    listOrder:mutipleMongooseToObject(listOrder)
                })
            })
    }


}

module.exports = new AdminController
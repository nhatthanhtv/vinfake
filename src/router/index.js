const homeRouter = require('./home')
const productRouter = require('./product')
const cartRouter = require('./cart')
const adminRouter = require('./admin')

function route(app){
    app.use('/admin', adminRouter)
    app.use('/cart', cartRouter)
    app.use('/product', productRouter)
    app.use('/', homeRouter)
}

module.exports = route
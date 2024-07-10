const express = require('express')
const booksRouter = require('./books.router')
const authorsRouter = require('./authors.router')

function routerProyecto(app){
    const router = express.Router()

    app.use('/v1',router)

    router.use('/books', booksRouter)
    router.use('/authors', authorsRouter)
}

module.exports = routerProyecto
'use strict';

const express = require('express');
const app = express();
const createError = require('http-errors')

const indexRoutes = require('./routes')
const helloRoutes = require('./routes/hello')

app.use('/', indexRoutes)
app.use('/hello', helloRoutes)

app.use((req, res, next) => {
    if (req.method !== 'GET') {
        next(createError(405))
        console.log("1")
        return
    }
    console.log("2")
    next(createError(404))
})

app.use((err, req, res, next) => {
    console.log('3');
    res.status(err.status || 500)
    res.send(err.message)
})

module.exports = app;
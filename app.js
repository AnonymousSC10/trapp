'use strict'

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    indexRoute = require('./routes/index'),
    ejs = require('ejs'),
    faviconURL = __dirname + '/public/img/favicon.ico',
    publicDir = express.static(__dirname + '/public'),
    viewDir = __dirname + '/views',
    port = (process.env.PORT || 80),
    app = express()

app
   .set('views', viewDir)
   .set('port', port)
   .set('view engine', 'ejs')
   .use(favicon(faviconURL))
   .use(publicDir)
   .use('/', indexRoute)


module.exports = app
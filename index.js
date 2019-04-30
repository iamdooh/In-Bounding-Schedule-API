
var cookieParser = require('cookie-parser');
var express = require('express');
var routes = require('./routes');
var bodyParser = require('body-parser');

var app = express();

// Set up template engine
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set('views', './views');

// Static files
app.use('/static', express.static('./public'));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Parse Cookies
app.use(cookieParser());

app.use(routes.router);

// 404 Handling
app.use(function(req, res, next) {
    res.status(404).render('404');
});

// Error Handler
app.use(function(err, req, res, next) {
    req.log.error(err);
    res.status(err.status || 500);
    var data = {
        statusCode: res.statusCode,
        error: null
    };

    res.render('404', data);
});

// Listen to port
app.listen(3000);
console.log('You are listening to port 3000');

var express = require('express');

var app = express();

var routerOptions = {
    caseSensitive: true,
    strict: true
};

var router = express.Router(routerOptions);

var urlBuildControllers = require('./controllers/urlBuilderController.js');
var scheduleControllers = require('./controllers/scheduleController.js');

router.get('/', urlBuildControllers.index);

router.get('/url/:id', urlBuildControllers.shortUrl);

router.get('/generate-button', urlBuildControllers.button);

router.get('/qrcode', urlBuildControllers.generateQRCode);

router.post('/generate-short-url', urlBuildControllers.generateShortUrl);

router.get('/list', scheduleControllers.list);

router.get('/insert', scheduleControllers.insertConfirm);

router.post('/insert', scheduleControllers.insert);

router.delete('/insert/:id', scheduleControllers.remove);

router.get('/example', scheduleControllers.example);
router.get('/confirm', scheduleControllers.example.confirm);
router.get('/download', scheduleControllers.example.download);


module.exports = { router };
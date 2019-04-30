
//var shortUrl = require('node-url-shortener');
//googleUrl = new GoogleUrl({ key: 'AIzaSyAj5rXVq4PN0mY_g4unZa1Ugvc3J7ROClk' });

var mongoose = require('mongoose');
var queryString = require('query-string');
var qr = require('qr-image');

var dbConifg = 'mongodb://test:test1234@ds129946.mlab.com:29946/short-urls';

var shortUrlSchema = new mongoose.Schema({
	originalUrl: String
});

var Shorturls = mongoose.model('Shorturls', shortUrlSchema);

mongoose.set('debug', true);

module.exports.index = function(req, res){
	return res.render('url-builder');
};

module.exports.button = function(req, res){
	return res.render('button', {query: req.query});
};

module.exports.generateShortUrl = function(req, res){
	mongoose.connect(dbConifg);

	Shorturls.findOne({originalUrl: req.body.originalUrl}, function(err, data){
		if (err) throw err;

		if(data == null){
			Shorturls.create(req.body, function(err, newData){
				if (err) throw err;

				mongoose.connection.close();

				return res.json(newData);
			});
		} else {
			mongoose.connection.close();

			return res.json(data);
		}
	});
};

module.exports.generateQRCode = function(req, res){
	var code = qr.image(req.query.originalUrl, { type: 'svg' });
	res.type('svg');
	code.pipe(res);

	return res.json(code);
};

module.exports.shortUrl = function(req, res){
	mongoose.connect(dbConifg);

	Shorturls.findById(req.params.id, function(err, data){
		if (err) throw err;

		mongoose.connection.close();

		return res.render('insert', {id: req.params.id, query: queryString.parseUrl(data.originalUrl).query});
	});
};
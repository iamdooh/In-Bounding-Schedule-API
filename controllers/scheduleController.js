
var mongoose = require('mongoose');
var moment = require('moment');

var dbConifg = 'mongodb://test:test1234@ds111638.mlab.com:11638/schedules';

var scheduleApiSchema = new mongoose.Schema({
	title: String,
	startDate: Date,
	url: String,
	location: String,
	description: String
});

var Schedules = mongoose.model('Schedules', scheduleApiSchema);

module.exports.list = function(req, res){
	mongoose.connect(dbConifg);

	Schedules.find({}, function(err, data){
		if (err) throw err;

		mongoose.connection.close();

		return res.render('list', {schedules: data, moment: moment});
	});
};

module.exports.insertConfirm = function(req, res){
	return res.render('insert', {query: req.query});
};

module.exports.insert = function(req, res){
	mongoose.connect(dbConifg);

	Schedules.create(req.body, function(err, data){
		if (err) throw err;

		mongoose.connection.close();

		return res.json(data);
	});
};

module.exports.remove = function(req, res){
	mongoose.connect(dbConifg);

	Schedules.deleteOne({_id: req.params.id}, function(err, data){
		if (err) throw err;

		mongoose.connection.close();

		return res.json(data);
	});
};

module.exports.example = function(req, res){
	return res.render('example');
};

module.exports.example.confirm = function(req, res){
	return res.render('insert-pc', {query: req.query});
};

module.exports.example.download = function(req, res){
	return res.render('download');
};
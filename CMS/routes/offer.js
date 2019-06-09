var express = require('express');
var router = express.Router();
var Database = require('./FirebaseConfig.js');

var config = {
	    apiKey: "AIzaSyBSwopfdHBD73gGOAjf-DJm0dq9j0HaLBo",
	    authDomain: "nodejstofirebase.firebaseapp.com",
	    databaseURL: "https://nodejstofirebase.firebaseio.com",
	    projectId: "nodejstofirebase",
	    storageBucket: "nodejstofirebase.appspot.com",
	    messagingSenderId: "279800640313"
	  };

router.get('/', function(req, res, next) {
	var db = Database.database().ref('/products');
	db.on('value',function(snap){
		var data = snap.val();
		res.render('offer',{
			data : data,
			title : 'Products',
			app :  config 
		});
	});
});

module.exports = router;
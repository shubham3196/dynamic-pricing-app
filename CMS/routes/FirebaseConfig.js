var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBSwopfdHBD73gGOAjf-DJm0dq9j0HaLBo",
    authDomain: "nodejstofirebase.firebaseapp.com",
    databaseURL: "https://nodejstofirebase.firebaseio.com",
    projectId: "nodejstofirebase",
    storageBucket: "nodejstofirebase.appspot.com",
    messagingSenderId: "279800640313"
  };
var Database = firebase.initializeApp(config);

module.exports = Database;
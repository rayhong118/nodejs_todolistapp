var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var todoController = require('./controllers/todoController');

//set ejs as template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controller
todoController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');

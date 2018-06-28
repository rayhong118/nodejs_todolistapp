var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//connect to the database
mongoose.connect('mongodb://localhost:27017/todo');

//create schema, style of items 
var todoSchema = new mongoose.Schema({
    item: String
});

//model with capital first letter
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended:false});


module.exports = function(app){
    app.get('/todo', function(req,res){
        //get data from mongodb and pass it to the view
        Todo.find({}, function(err,data){
            if (err) throw err;
            res.render('todo',{todos:data});
        });//find all items in Todo collection
    });

    app.post('/todo', urlencodedParser, function(req,res){
        //var hashedString;
        //hash the req.body string and store it into a var
        bcrypt.hash(req.body.item, 10, function(err, hash){
            console.log('req.params.item is ' + req.body.item);
            req.body.item = hash;
            console.log('hashed string is ' + hash);
            var hashedItem = ({item : hash});
            var newTodoHashed = Todo(hashedItem).save(function(err,data){
                if (err) throw err;
                res.json(data)
            });
        });
        
    });

    app.delete('/todo/:item', function(req,res){
        //delete the requested item from database
        Todo.find({item: req.params.item}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
}
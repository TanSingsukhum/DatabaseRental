var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
var PORT = process.env.PORT || 3000;
var db = require('./db-connector')
var exphbs = require('express-handlebars');

app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.locals.layout = false;
/*
    ROUTES
*/

app.get('/', function(req, res) {
    res.render('index'); 
});

app.get('/buildings', function(req,res){
    let query = "SELECT * FROM Buildings";
    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving buildings:", err);
            res.status(500).send("Error retrieving buildings");
            return;
        }
        res.render('buildings', { buildings: results });
    });
})

//Get table from hosts
app.get('/hosts', function(req, res) {
    let query = "SELECT * FROM Hosts";
    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving hosts:", err);
            res.status(500).send("Error retrieving hosts");
            return;
        }
        res.render('hosts', { hosts: results });
    });
});

//CRUD OPERATIONS

app.post('/hosts', function(req, res){
    //Create new post
});

app.put('/hosts/:id', function(req, res){
    //Update an existing host
})

app.delete('/hosts/:id', function(req, res){
    //Delete host
})


app.get('/clients', function(req,res){
    let query = "SELECT * FROM Clients";
    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving hosts:", err);
            res.status(500).send("Error retrieving hosts");
            return;
        }
        res.render('clients', { clients: results });
    });
})

app.get('/transactions', function(req,res){
    let query = "SELECT * FROM Transactions";
    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving transactions:", err);
            res.status(500).send("Error retrieving transactions");
            return;
        }
        res.render('transactions', { transactions: results });
    });
})

app.get('/rental_histories', function(req, res){
    let query = "SELECT * FROM Rental_Histories"
    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving rental history:", err);
            res.status(500).send("Error retrieving rental history");
            return;
        }
        res.render('rental_histories', { rental_histories: results });
    });
})


app.get('/reviews', function(req, res){
    let query = "SELECT * FROM Reviews"
    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving reviews:", err);
            res.status(500).send("Error retrieving reviews");
            return;
        }
        res.render('reviews', { reviews: results });
    });
})


app.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
});
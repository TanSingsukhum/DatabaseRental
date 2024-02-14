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


app.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
});
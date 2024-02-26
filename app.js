var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
var PORT = process.env.PORT || 2150;
var db = require('./db-connector')
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.locals.layout = false;

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

app.post('/add-client-form', function(req, res) {
    let data = req.body;
        console.log('Request body:', req.body); // Log the request body to see if data is being received

    console.log('Received data:', data); // Log received data

    let phoneNumber = parseInt(data.phoneNumber);
    let zipcode = parseInt(data.zipcode);

    let query = `INSERT INTO Clients (building_id, phone_number, client_name, client_email, state, city, address, zipcode)
    VALUES ('${data.buildingID}', '${phoneNumber}', '${data.clientName}', '${data.clientEmail}', '${data.state}', '${data.city}', '${data.address}', '${zipcode}')`;
    
    db.pool.query(query, function(error, result) {
        if (error) {
            console.error("Error inserting client:", error);
            res.status(500).send("Error inserting client");
            return;
        }
        
        // Query the database to get the inserted client data
        let selectQuery = 'SELECT * FROM Clients WHERE client_id = LAST_INSERT_ID()';
        db.pool.query(selectQuery, function(selectError, selectResult) {
            if (selectError) {
                console.error("Error retrieving inserted client:", selectError);
                res.status(500).send("Error retrieving inserted client");
                return;
            }
            // Send the inserted client data as response
            res.status(200).json(selectResult);
        });
    });
});



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
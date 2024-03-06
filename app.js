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
    let query;

    if(req.query.building_id === undefined){
        query = "SELECT * FROM Buildings";
    }else{
        query = `SELECT * FROM Buildings WHERE building_id LIKE "${req.query.building_id}%"`
    }
    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving buildings:", err);
            res.status(500).send("Error retrieving buildings");
            return;
        }
        res.render('buildings', { buildings: results });
    });
})
//CREATE
app.post('/add-building-form', function(req, res) {
    let data = req.body;

    console.log('Request body:', req.body); // Log the request body to see if data is being received
    console.log('Received data:', data); // Log received data

    let hostID = parseInt(data.hostID);
    let bedroomNumber = parseInt(data.bedroomNumber);
    let bathroomNumber = parseInt(data.bathroomNumber);
    let rentAmount = parseFloat(data.rentAmount);
    let clientNumber = parseInt(data.clientNumber);
    let zipcode = parseInt(data.zipcode);

    let query = `INSERT INTO Buildings (host_id, bedroom_number, bathroom_number, rent_amount, client_number, state, city, address, zipcode)
    VALUES ('${hostID}', '${bedroomNumber}', '${bathroomNumber}', '${rentAmount}', '${clientNumber}', '${data.state}', '${data.city}', '${data.address}', '${zipcode}')`;
    
    // Execute the query
    db.pool.query(query, function(error, result) {
        if (error) {
            console.error('Error inserting building:', error);
            res.status(500).send('Error inserting building');
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
//DELETE
app.delete('/delete-building/:buildingID', function(req,res,next){
        console.log("Here in delete route");
        let data = req.body;
        console.log(req.params.buildingID);
        let deleteBuilding_ID = `DELETE FROM Buildings WHERE building_id = ?`;

        db.pool.query(deleteBuilding_ID, [req.params.buildingID], function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }else{
                res.sendStatus(200);
            }
        });
});
//UPDATE
app.put('/update-building/:buildingID', function(req, res, next) {
    let newRent = req.body.rent_amount;
    let buildingID = req.params.buildingID;

    let updateQuery = 'UPDATE Buildings SET rent_amount = ? WHERE building_id = ?';

    db.pool.query(updateQuery, [newRent, buildingID], function(error, rows, fields) {
        if (error) {
            console.error('Error updating rent amount:', error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
});


//Get table from hosts
app.get('/hosts', function(req, res) {
    let query;

    if(req.query.host_name === undefined){
        query = "SELECT * FROM Hosts";
    }else{
        query = `SELECT * FROM Hosts WHERE host_name LIKE "${req.query.host_name}%"`
    }
    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving hosts:", err);
            res.status(500).send("Error retrieving hosts");
            return;
        }
        res.render('hosts', { hosts: results });
    });
});
//CREATE
app.post('/add-hosts-form', function(req, res){
    let data = req.body;
    console.log('Request body:', req.body); // Log the request body to see if data is being received
    console.log('Received data:', data); // Log received data
    /*
        hostName: inputName,
        hostEmail: inputEmail,
        hostPhoneNumber: inputPhoneNumber,
        numberBuildingsOwned: inputNumberBuildings
    */
    let buildingsNumber = parseInt(data.numberBuildingsOwned);

    let query = `INSERT INTO Hosts( host_name, host_email, host_phone_number, number_buildings_owned) 
    VALUES('${data.hostName}', '${data.hostEmail}', '${data.hostPhoneNumber}', '${buildingsNumber}');`

    db.pool.query(query, function(error, result) {
        if (error) {
            console.error('Error inserting host:', error);
            res.status(500).send('Error inserting host');
            return;
        }
        
       // Query the database to get the inserted client data
       let selectQuery = 'SELECT * FROM Hosts WHERE host_id = LAST_INSERT_ID()';
       db.pool.query(selectQuery, function(selectError, selectResult) {
           if (selectError) {
               console.error("Error retrieving inserted host:", selectError);
               res.status(500).send("Error retrieving inserted host");
               return;
           }
           // Send the inserted client data as response
           res.status(200).json(selectResult);
       });
       
    });
    
});
//DELETE
app.delete('/delete-hosts/:hostID', function(req,res,next){
    console.log("Here in delete route");
    let data = req.body;
    console.log(req.params.hostID);
    
    let deleteHost_ID = `DELETE FROM Hosts WHERE host_id = ?`;
    console.log(deleteHost_ID);

    db.pool.query(deleteHost_ID, [req.params.hostID], function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }else{
            res.sendStatus(200);
        }
    });
});
//UPDATE
app.put('/update-hosts/:hostID', function(req, res) {
    const hostID = req.params.hostID;
    const newBuildingsOwned = req.body.number_buildings_owned;
    console.log(newBuildingsOwned)
    console.log(hostID)
    
    const updateQuery = 'UPDATE Hosts SET number_buildings_owned = ? WHERE host_id = ?';

    db.pool.query(updateQuery, [newBuildingsOwned, hostID], function(error, results, fields) {
        if (error) {
            console.error('Error updating host buildings owned:', error);
            res.status(500).json({ error: 'An error occurred while updating buildings owned' });
        } else {
            console.log('Buildings owned updated successfully');
            res.status(200).json({ message: 'Buildings owned updated successfully' });
        }
    });
});

app.get('/clients', function(req,res){
    let query;

    if(req.query.client_name === undefined){
        query = "SELECT * FROM Clients";
    }else{
        query = `SELECT * FROM Clients WHERE client_name LIKE "${req.query.client_name}%"`
    }
    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving hosts:", err);
            res.status(500).send("Error retrieving hosts");
            return;
        }
        res.render('clients', { clients: results });
    });
})
//CREATE
app.post('/add-client-form', function(req, res) {
    let data = req.body;
    console.log('Request body:', req.body); // Log the request body to see if data is being received
    console.log('Received data:', data); // Log received data

    let zipcode = parseInt(data.zipcode);

    let query = `INSERT INTO Clients (building_id, phone_number, client_name, client_email, state, city, address, zipcode)
    VALUES ('${data.buildingID}', '${data.phoneNumber}', '${data.clientName}', '${data.clientEmail}', '${data.state}', '${data.city}', '${data.address}', '${zipcode}')`;
    
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
//DELETE
app.delete('/delete-clients/:clientID', function(req,res,next){
    console.log("Here in delete route");
    let data = req.body;
    console.log(req.params.clientID);
    let deleteClient_ID = `DELETE FROM Clients WHERE client_id = ?`;

    db.pool.query(deleteClient_ID, [req.params.clientID], function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }else{
            res.sendStatus(200);
        }
    });
});
// UPDATE
app.put('/update-client/:clientName', function(req, res) {
    const clientName = req.params.clientName;
    const newPhoneNumber = req.body.phone_number;
    
    const updateQuery = 'UPDATE Clients SET phone_number = ? WHERE client_name = ?';
    db.pool.query(updateQuery, [newPhoneNumber, clientName], function(error, results, fields) {
        if (error) {
            console.error('Error updating client phone number:', error);
            res.status(500).json({ error: 'An error occurred while updating client phone number' });
        } else {
            console.log('Client phone number updated successfully');
            res.status(200).json({ message: 'Client phone number updated successfully' });
        }
    });
});





app.get('/transactions', function(req,res){
    let query;

    if(req.query.rental_id === undefined){
        query = "SELECT * FROM Transactions";
    }else{
        query = `SELECT * FROM Transactions WHERE rental_id LIKE "${req.query.rental_id}%"`
    }

    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving transactions:", err);
            res.status(500).send("Error retrieving transactions");
            return;
        }
        res.render('transactions', { transactions: results });
    });
})
//UPDATE
app.post('/add-transaction-form', function(req,res){

    /*
            rentalID: inputRentalID,
        paymentMethod: inputPaymentMethod,
        paymentAmount: inputPaymentAmount,
        datePaid: inputDatePaid
            let leaseStart = new Date(data.leaseStartDate).toISOString().slice(0, 19).replace('T', ' ');

    */
    let data = req.body;
    console.log('Request body:', req.body); // Log the request body to see if data is being received
    console.log('Received data:', data); // Log received data

    let rentalID = parseInt(data.rentalID);
    let paymentAmount = parseFloat(data.paymentAmount);
    let datePaid = new Date(data.datePaid).toISOString().slice(0, 19).replace('T', ' ');

    let query = `INSERT INTO Transactions (rental_id, payment_method , payment_amount, date_paid)
    VALUES('${rentalID}', '${data.paymentMethod}', '${paymentAmount}', '${datePaid}' );`;
    
    db.pool.query(query, function(error, result) {
        if (error) {
            console.error("Error inserting transaction: ", error);
            res.status(500).send("Error inserting transaction");
            return;
        }
        
        // Query the database to get the inserted client data
        let selectQuery = 'SELECT * FROM Transactions WHERE rental_ID = LAST_INSERT_ID()';
        db.pool.query(selectQuery, function(selectError, selectResult) {
            if (selectError) {
                console.error("Error retrieving inserted transaction:", selectError);
                res.status(500).send("Error retrieving inserted transaction");
                return;
            }
            // Send the inserted client data as response
            res.status(200).json(selectResult);
        });
    });
})
//DELETE
app.delete('/delete-transaction/:transactionID', function(req,res,next){
    console.log("Here in delete route");
    let data = req.body;
    console.log(req.params.transactionID);
    let deleteTransaction_ID = `DELETE FROM Transactions WHERE transaction_id = ?`;

    db.pool.query(deleteTransaction_ID, [req.params.transactionID], function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }else{
            res.sendStatus(200);
        }
    });
});
// UPDATE 
app.put('/update-transaction/:transactionId', function(req, res) {
    const transactionId = req.params.transactionId;
    const newPaymentAmount = req.body.payment_amount;
    console.log(newPaymentAmount);
    console.log(transactionId);
    
    const updateQuery = 'UPDATE Transactions SET payment_amount = ? WHERE transaction_id = ?';
    db.pool.query(updateQuery, [newPaymentAmount, transactionId], function(error, results, fields) {
        if (error) {
            console.error('Error updating transaction payment amount:', error);
            res.status(500).json({ error: 'An error occurred while updating payment amount' });
        } else {
            console.log('Payment amount updated successfully');
            res.status(200).json({ message: 'Payment amount updated successfully' });
        }
    });
});


app.get('/rental_histories', function(req, res){
    let query;

    if(req.query.rental_id === undefined){
        query = "SELECT * FROM Rental_Histories";
    }else{
        query = `SELECT * FROM Rental_Histories WHERE rental_id LIKE "${req.query.rental_id}%"`
    }
    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving rental history:", err);
            res.status(500).send("Error retrieving rental history");
            return;
        }
        res.render('rental_histories', { rental_histories: results });
    });
})
//CREATE
app.post('/add-rentalHistory-form', function(req, res) {
    let data = req.body;
    console.log('Request body:', req.body); // Log the request body to see if data is being received
    console.log('Received data:', data); // Log received data

    let clientID = parseInt(data.clientID);
    let buildingID = parseInt(data.buildingID);
    let leaseStart = new Date(data.leaseStartDate).toISOString().slice(0, 19).replace('T', ' ');
    let leaseEnd = new Date(data.leaseEndDate).toISOString().slice(0, 19).replace('T', ' ');

    let query = `INSERT INTO Rental_Histories (client_id, building_id, lease_start_date, lease_end_date)
    VALUES (${clientID}, ${buildingID}, '${leaseStart}', '${leaseEnd}')`;
    
    db.pool.query(query, function(error, result) {
        if (error) {
            console.error("Error inserting rental history:", error);
            res.status(500).send("Error inserting rental history");
            return;
        }
        
        // Query the database to get the inserted client data
        let selectQuery = 'SELECT * FROM Rental_Histories WHERE rental_ID = LAST_INSERT_ID()';
        db.pool.query(selectQuery, function(selectError, selectResult) {
            if (selectError) {
                console.error("Error retrieving inserted rental history:", selectError);
                res.status(500).send("Error retrieving inserted rental history");
                return;
            }
            // Send the inserted client data as response
            res.status(200).json(selectResult);
        });
    });
});
//DELETE
app.delete('/delete-rentalHistory/:rentalID', function(req,res,next){
    console.log("Here in delete route");
    let data = req.body;
    console.log(req.params.rentalID);
    let deleteRental_ID = `DELETE FROM Rental_Histories WHERE rental_id = ?`;

    db.pool.query(deleteRental_ID, [req.params.rentalID], function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }else{
            res.sendStatus(200);
        }
    });
});
//UPDATE
app.put('/update-rental-history/:rentalId', function(req, res) {
    const rentalId = req.params.rentalId;
    const newLeaseEndDate = req.body.lease_end_date;

    // Update the lease end date in the database
    const updateQuery = 'UPDATE Rental_Histories SET lease_end_date = ? WHERE rental_id = ?';
    db.pool.query(updateQuery, [newLeaseEndDate, rentalId], function(error, results, fields) {
        if (error) {
            console.error('Error updating lease end date:', error);
            res.status(500).json({ error: 'An error occurred while updating lease end date' });
        } else {
            console.log('Lease end date updated successfully');
            res.status(200).json({ message: 'Lease end date updated successfully' });
        }
    });
});


app.get('/reviews', function(req, res){
    let query;

    if(req.query.rating === undefined){
        query = "SELECT * FROM Reviews";
    }else{
        query = `SELECT * FROM Reviews WHERE rating LIKE "${req.query.rating}%"`
    }
    db.pool.query(query, function(err, results) {
        if (err) {
            console.error("Error retrieving reviews:", err);
            res.status(500).send("Error retrieving reviews");
            return;
        }
        res.render('reviews', { reviews: results });
    });
})
//CREATE
app.post('/add-review-form', function(req, res) {
    let data = req.body;

    console.log('Request body:', req.body); // Log the request body to see if data is being received
    console.log('Received data:', data); // Log received data

    /*
        clientID: inputClientID,
        buildingID: inputBuildingID,
        rating: inputRating,
        comment: inputComment
    */
    let clientID = parseInt(data.clientID);
    let buildingID = parseInt(data.buildingID);
    let rating = parseInt(data.rating);

    let query = `INSERT INTO Reviews (client_id, building_id, rating, comments)
    VALUES (${clientID}, ${buildingID}, '${rating}', '${data.comment}')`;
    
    db.pool.query(query, function(error, result) {
        if (error) {
            console.error("Error inserting review:", error);
            res.status(500).send("Error inserting review");
            return;
        }
        
        // Query the database to get the inserted client data
        let selectQuery = 'SELECT * FROM Reviews WHERE review_ID = LAST_INSERT_ID()';
        db.pool.query(selectQuery, function(selectError, selectResult) {
            if (selectError) {
                console.error("Error retrieving inserted review:", selectError);
                res.status(500).send("Error retrieving inserted review");
                return;
            }
            // Send the inserted client data as response
            res.status(200).json(selectResult);
        });
    });
});
//DELETE
app.delete('/delete-reviews/:reviewID', function(req,res,next){
    console.log("Here in delete route");
    let data = req.body;
    console.log(req.params.reviewID);
    let deleteReview_ID = `DELETE FROM Reviews WHERE review_id = ?`;

    db.pool.query(deleteReview_ID, [req.params.reviewID], function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }else{
            res.sendStatus(200);
        }
    });
});
//UPDATE
app.put('/update-review/:reviewId', function(req, res) {
    const reviewId = req.params.reviewId;
    const newRating = req.body.rating;
    const newComment = req.body.comment;

    console.log(reviewId);
    console.log(newRating);
    console.log(newComment);

    const updateQuery = 'UPDATE Reviews SET rating = ?, comments = ? WHERE review_id = ?';
    db.pool.query(updateQuery, [newRating, newComment, reviewId], function(error, results, fields) {
        if (error) {
            console.error('Error updating review:', error);
            res.status(500).json({ error: 'An error occurred while updating review' });
        } else {
            console.log('Review updated successfully');
            res.status(200).json({ message: 'Review updated successfully' });
        }
    });
});

app.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
});
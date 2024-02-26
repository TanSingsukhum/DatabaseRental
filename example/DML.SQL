--Clients table CRUD
SELECT * FROM Clients

-- INSERT query to add a new client
INSERT INTO Clients( building_id, phone_number, client_name, client_email, state, city, address, zipcode)
VALUES (:buildingID, :phoneNumber, :clientName, :clientEmail, :state, :city, :address, :zipcode);


-- UPDATE query to update client phone and email
UPDATE Clients
SET phone_number = :phoneNumber, email = :email
WHERE client_id = :clientId;

-- DELETE query to remove a client
DELETE FROM Clients
WHERE client_id = :clientID;


-- Buildings table CRUD
SELECT * FROM Buildings

-- INSERT QUERY TO ADD A NEW BUILDING
INSERT INTO Buildings( host_id, bedroom_number, bathroom_number, rent_amount, client_number, state, city, address, zipcode)
VALUES(:hostID, :bedroomNumber, :bathroomNumber, :rentAmount, :clientNumber, :state, :city, :address, :zipcode);

-- UPDATE query to update building rentAmount
UPDATE Building 
SET rent_amount = :rent_amount
WHERE building_id = :building_id;

-- DELETE query to remove a Building
DELETE FROM Buildings
WHERE building_id = :buildingID;


-- HOSTS table CRUD
SELECT * FROM Hosts

-- INSERT QUERY TO ADD NEW HOST
INSERT INTO Hosts( host_name, host_email, host_phone_number, number_buildings_owned) 
VALUES(:hostName, :hostEmail, :hostPhoneNumber, :numberBuildingsOwned);

-- UPDATE query to update host buildings owned
UPDATE Hosts
SET number_buildings_owned = :numberBuildingsOwned
where host_id = :hostID;

-- DELETE query to remove a host
DELETE FROM Hosts
WHERE host_id = :hostID;


-- Rental Histories table CRUD
SELECT * FROM Rental_Histories

-- INSERT QUERY TO ADD NEW HOST
INSERT INTO Rental_Histories( client_id, building_id, lease_start_date, lease_end_date)
VALUES(:clientID, :buildingID, :leaseEndDate, :leaseStartDate);

-- UPDATE query to update host buildings owned
UPDATE Rental_Histories
SET lease_start_date = :leaseStartDate, lease_end_date = :lease_end_date
where rental_id = :rentalID;

-- DELETE query to remove a host
DELETE FROM Rental_Histories
WHERE rental_id = :rentalID;


-- Reviews table CRUD
SELECT * FROM Reviews

-- INSERT QUERY TO ADD NEW HOST
INSERT INTO Reviews(client_id, building_id , rating, comments)
VALUES(:clientID, :buildingID, :rating, :comments);

-- UPDATE query to update comment
UPDATE Reviews
SET comments = :comment
where review_id = :reviewID;

-- DELETE query to remove a host
DELETE FROM Reviews
WHERE review_id = :reviewID;


-- Transaction table CRUD
SELECT * FROM Transactions

-- INSERT QUERY TO ADD NEW HOST
INSERT INTO Transaction(rental_id, payment_method , payment_amount, date_paid)
VALUES(:rentalID, :paymentMethod, :paymentAmount, :datePaid);


-- DELETE query to remove a host
DELETE FROM Transactions
WHERE transaction_id = :transactonID;


-- READ/SELECT query to select clients with their associated buildings
SELECT Clients.*, Buildings.*
FROM Clients
INNER JOIN Buildings ON Clients.building_id = Buildings.building_id;
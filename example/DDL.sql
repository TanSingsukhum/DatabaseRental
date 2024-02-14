SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

/*
Title: Rental Management System
Authors: Chi Chan, Taz Larson, Thanaphon Singsukhum
Group: 90
Project SQL 

*/
CREATE OR REPLACE TABLE Hosts (
    host_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    host_name VARCHAR(255) NOT NULL,
    host_email VARCHAR(255) NOT NULL,
    host_phone_number VARCHAR(12) NOT NULL,
    number_buildings_owned INT NOT NULL,
    PRIMARY KEY (host_id)
);
INSERT INTO Hosts(host_id, host_name, host_email, host_phone_number, number_buildings_owned) 
VALUES 
(0, 'Ronaldo', 'Ronaldo@gmail.com', '971-234-2342', 3),
(1, 'John', 'John@gmail.com', '503-123-5432', 2),
(2, 'Micheal', 'Micheal@gmail.com', '942-125-2423', 1),
(3, 'Steve', 'Steve@gmail.com', '503-486-3489', 3),
(4, 'Henry', 'Henry@gmail.com', '188-482-1850', 2);


CREATE OR REPLACE TABLE Buildings (
    building_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    host_id INT NOT NULL,
    bedroom_number INT NOT NULL,
    bathroom_number INT NOT NULL,
    rent_amount DECIMAL(6,2) NOT NULL,
    client_number INT NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    address VARCHAR(255) NOT NULL,
    zipcode INT(5) NOT NULL,
    PRIMARY KEY (building_id),
    FOREIGN KEY (host_id) REFERENCES Hosts(host_id)
);
INSERT INTO Buildings(building_id, host_id, bedroom_number, bathroom_number, rent_amount, client_number, state, city, address, zipcode)
VALUES
(1,2,3,1,750.00, 3, 'Oregon', 'Portland', '1223 NW 12th Ave APT 73B', 97209),
(2,3,2,1,600.00, 2, 'Oregon', 'Corvallis', '3930 NW WITMAN HILL DR APT 13', 97333),
(3,0,4,2,1000.00, 4, 'Oregon', 'Corvallis', '960 SW WASHINGTON AVE', 97330),
(4,1,4,2,1500.00, 4, 'Oregon', 'Eugene', '600 Cherry Dr APT 2', 97401),
(5,4,6,3,3000.00, 3, 'Oregon', 'Portland', '1784 NW NORTHRUP ST', 97209);

CREATE OR REPLACE TABLE Clients (
    client_id INT AUTO_INCREMENT UNIQUE NOT NULL,
    building_id INT NOT NULL,
    phone_number VARCHAR(12) NOT NULL,
    client_name VARCHAR(255) NOT NULL,  -- Specify the length for client_name
    client_email VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    zipcode INT(5) NOT NULL,
    FOREIGN KEY (building_id) REFERENCES Buildings(building_id),
    PRIMARY KEY (client_id)
);
INSERT INTO Clients(client_id, building_id, phone_number, client_name, client_email, state, city, address, zipcode)
VALUES
(0, 1, '971-532-1241', 'Alejandro', 'garnacho@gmail.com', 'Oregon', 'Portland', '123 NW 12th AVE APT 738', 97209),
(1, 3, '503-423-7963', 'Rapheal', 'rashael@gmail.com', 'Oregon', 'Corvallis', '960 SW WASHINGTON AVE', 97330),
(2, 2, '293-985-9343', 'Harry', 'maguire@gmail.com', 'Oregon', 'Corvallis', '3930 NW WITMAN HILL DR APT 13', 97333),
(3, 4, '986-910-9185', 'Andre', 'onana@gmail.com', 'Oregon', 'Eugene', '600 Cherry Dr APT 2', 97401),
(4, 5, '787-777-2932', 'Pessi', 'pessi@gmail.com', 'Oregon', 'Portland', '1784 NW NORTHRUP ST', 97209);

CREATE OR REPLACE TABLE Rental_Histories (
    rental_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    client_id INT NOT NULL,
    building_id INT NOT NULL,
    lease_start_date DATE NOT NULL,
    lease_end_date DATE,
    PRIMARY KEY (rental_id),
    FOREIGN KEY (client_id) REFERENCES Clients(client_id),
    FOREIGN KEY (building_id) REFERENCES Buildings(building_id)
);
INSERT INTO Rental_Histories(rental_id, client_id, building_id, lease_start_date, lease_end_date)
VALUES
(1, 0, 1, '2023-06-30', '2024-06-30'),
(2, 1, 3, '2020-06-10', NULL),
(3, 2, 2, '2022-06-30', NULL),
(4, 3, 4, '2020-03-10', '2024-03-10'),
(5, 4, 5, '2024-03-10', NULL);


CREATE OR REPLACE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    rental_id INT NOT NULL,
    payment_method VARCHAR(255),
    payment_amount DECIMAL(10,2),
    date_paid DATE,
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (rental_id) REFERENCES Rental_Histories(rental_id)
);
INSERT INTO Transactions(transaction_id, rental_id, payment_method, payment_amount, date_paid)
VALUES
(0, 1, 'Credit Card', 760, '2024-01-05'),
(1, 2, 'Bank Wire', 1000, '2024-01-04'),
(2, 3, 'Check', 600, '2024-01-25'),
(3, 4, 'Credit Card', 1000, '2024-01-10'), 
(4, 5, 'Credit Card', 1500, '2024-01-20'); 


CREATE OR REPLACE TABLE Reviews (
    review_id INT AUTO_INCREMENT NOT NULL UNIQUE,
    client_id INT NOT NULL,
    building_id INT NOT NULL,
    rating INT NOT NULL,
    comments VARCHAR(255),
    PRIMARY KEY (review_id),
    FOREIGN KEY (client_id) REFERENCES Clients(client_id),
    FOREIGN KEY (building_id) REFERENCES Buildings(building_id)
);
INSERT INTO Reviews(review_id, client_id, building_id, rating, comments)
VALUES 
(1, 0, 1, 5, 'Clean and cheap'),  
(2, 1, 3, 4, 'Decent'),
(3, 2, 2, 2, 'Loud'),  
(4, 3, 4, 1, 'Dirty'),  
(5, 4, 5, 3, 'Average');


SET FOREIGN_KEY_CHECKS=1;
COMMIT;


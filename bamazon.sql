DROP DATABASE IF EXISTS bamazonDB

CREATE DATABASE bamazonDB

USE bamazonDB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Pop up Tent", "Outdoor Gear", 45.89, 150);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Sling Shoulder Backpack", "Outdoor Gear", 20.37, 300), 

("Sneakers", "Clothing", 45.00, 50)
('Baseball Cap', 'Clothing', 20.00, 250)

('Ab Wheel', "Exercise & Fitness", 14.28, 100)
('Fitness Tracker (Fitbit)', "Exercise & Fitness", 44.99, 300)


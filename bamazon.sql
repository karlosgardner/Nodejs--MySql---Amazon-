CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price decimal(10,3),
  stock_quantity INTEGER,
  
PRIMARY KEY (item_id)
);


SELECT * FROM products;


INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Javascript the good parts", "Book", 5.99, 20);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Express js", "Book", 32.99, 24);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Pro Grunt js", "Book", 19.99, 10);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Million Dollar Slave", "Book", 25.99, 25);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Python", "Book", 23, 50);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("C ++", "Book", 45.99, 5);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Html & CSS", "Book", 28.99, 69);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("You dont know JS", "Book", 10.99, 10);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("C", "Book", 17.99, 55);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Node js & React", "Book", 42.99, 100);





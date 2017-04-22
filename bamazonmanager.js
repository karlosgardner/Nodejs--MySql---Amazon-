
// Importing some mysql and inquirer packages


var inquirer = require("inquirer"),
    mysql = require("mysql");



// Making a connection
var connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "mpc@3000",
    database: "Bamazon"
});


connection.connect();


var viewProduct = function () {
    connection.query("SELECT * FROM products", function (err, data) {
        if(err) { throw err;}
        data.map(function (el) { 
            console.log("Item ID: " + el.item_id + " || Product Name: " + el.product_name + " || Price $" + el.price);
        });
    });
}




var viewLowInventory = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, data) {
        if(err) throw err;
        data.map(function (el) {
            console.log( " || Product Name: " + el.product_name + " || Stock: " + el.stock_quantity );
        });
    });
}





var addInventory = function (quantity, product, id) {
    connection.query("UPDATE products SET stock_quantity = ? WHERE product_name = ? OR item_id = ?", [quantity, product, id], function (err, data) {
        if(err) throw err;
        console.log("Inventory is now updated!");
    });
}


var inventoryQuestions = [
    {
        type:"input",
        name:"quantity",
        message:"What's the quantity you want to add?"
    },
    {
        type:"input",
        name:"product",
        message:"What;s the name of the product you want to add?"
    },
    {
        type:"input",
        name:"id",
        message:"What's the id of the product you want to add?"
    }
];

var processInventory = function () {
    inquirer.prompt(inventoryQuestions)
        .then(function (data) {
            addInventory(data.quantity, data.product, data.id);
        })
        .catch(function (err) {
            return err;
        });
}



// Adding questions for adding products
var addQuestions = [
    {
        type:"input",
        name:"product",
        message: "Please add the name of the Product"
    },
    {
        type:"input",
        name:"quantity",
        message:"Please enter the quantity"
    },
    {
        type:"input",
        name:"price",
        message: "Please enter the price"
    },
    {
        type:"input",
        name:"department",
        message:"Please enter the name of the Department"
    }
];


// Add Product
var addProduct = function (name, depart, price, quantity) {
    var query = "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)";
    connection.query(query, [name, depart, price, quantity], function (err, data) {
        if(err) throw err;
        console.log("Product added!!");
    });
}


// Process the add products
var processAdd = function () {
    inquirer.prompt(addQuestions)
        .then(function (data) {
            addProduct(data.product, data.department, data.price, data.quantity);
        })
        .catch(function (err) {
            if(err){ throw err;}
        });
}



var questions = [
    {
        type:"list",
        name:"view",
        message:"Select ...",
        choices: ["View product for sale", "View low inventory", "Add inventory", "Add new product"]
    }
];





inquirer.prompt(questions)
    .then(function (data) {
        switch(data.view){
            case "View product for sale":
                viewProduct(); // it works done
                return "You choose the product";
                break;
            case "View low inventory":
                viewLowInventory();
                return "The low inventory is: ";
                break;
            case "Add inventory":
                processInventory();
                break;
            case "Add new product":
                processAdd();
                break;
            default:
                console.log("Not found!!");
        }
    })
    .then(function (data) {
        return data;
    })
    .catch(function (err) {
        console.log(err);
    });